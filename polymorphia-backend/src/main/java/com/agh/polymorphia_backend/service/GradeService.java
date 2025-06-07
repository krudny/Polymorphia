package com.agh.polymorphia_backend.service;

import com.agh.polymorphia_backend.dto.request.grade.AssignmentGradeRequestDto;
import com.agh.polymorphia_backend.dto.request.grade.GradeRequestDto;
import com.agh.polymorphia_backend.dto.request.grade.ProjectGradeRequestDto;
import com.agh.polymorphia_backend.dto.request.grade.TestGradeRequestDto;
import com.agh.polymorphia_backend.dto.request.grade.targets.AnimalTarget;
import com.agh.polymorphia_backend.dto.request.grade.targets.ProjectGroupTarget;
import com.agh.polymorphia_backend.exception.database.InvalidArgumentException;
import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.model.course.reward.Chest;
import com.agh.polymorphia_backend.model.event.gradable.Assignment;
import com.agh.polymorphia_backend.model.event.gradable.GradableEvent;
import com.agh.polymorphia_backend.model.event.gradable.ProjectCriterion;
import com.agh.polymorphia_backend.model.event.gradable.Test;
import com.agh.polymorphia_backend.model.event.submission.AssignmentSubmission;
import com.agh.polymorphia_backend.model.event.submission.ProjectSubmission;
import com.agh.polymorphia_backend.model.grade.AssignmentGrade;
import com.agh.polymorphia_backend.model.grade.Grade;
import com.agh.polymorphia_backend.model.grade.ProjectGrade;
import com.agh.polymorphia_backend.model.grade.TestGrade;
import com.agh.polymorphia_backend.model.grade.reward.AssignedChest;
import com.agh.polymorphia_backend.model.project.ProjectGroup;
import com.agh.polymorphia_backend.model.user.Instructor;
import com.agh.polymorphia_backend.repository.course.AnimalRepository;
import com.agh.polymorphia_backend.repository.course.reward.ChestRepository;
import com.agh.polymorphia_backend.repository.event.gradable.GradableEventRepository;
import com.agh.polymorphia_backend.repository.event.submission.SubmissionRepository;
import com.agh.polymorphia_backend.repository.grade.GradeRepository;
import com.agh.polymorphia_backend.repository.grade.reward.AssignedChestRepository;
import com.agh.polymorphia_backend.service.validation.GradeRequestValidator;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.function.Supplier;

import static com.agh.polymorphia_backend.service.DbExtractingUtil.*;

@Service
@Transactional
@AllArgsConstructor
public class GradeService {
    private static final String NO_SUBMISSION = "This gradableEvent has no submissions - unable to grade";


    private final GradableEventRepository gradableEventRepository;
    private final GradeRepository gradeRepository;
    private final AnimalRepository animalRepository;
    private final SubmissionRepository submissionRepository;
    private final ChestRepository chestRepository;
    private final AssignedChestRepository assignedChestRepository;

    private final GradeRequestValidator gradeRequestValidator;


    public List<Long> grade(GradeRequestDto gradeRequestDto, Instructor instructor) {
        GradableEvent<?> gradableEvent = getGradableEvent(gradeRequestDto.getGradableEventId());

        gradeRequestValidator.validate(gradeRequestDto, gradableEvent, instructor);
        try {
            return switch (gradeRequestDto.getType()) {
                case TEST -> gradeTest((TestGradeRequestDto) gradeRequestDto, (Test) gradableEvent);
                case ASSIGNMENT ->
                        gradeAssignment((AssignmentGradeRequestDto) gradeRequestDto, (Assignment) gradableEvent);
                case PROJECT ->
                        gradeProject((ProjectGradeRequestDto) gradeRequestDto, (ProjectCriterion) gradableEvent);
            };
        } catch (ClassCastException e) {
            throw new InvalidArgumentException(String.format(DB_OBJECT_NOT_FOUND,
                    FIELD_GRADABLE_EVENT,
                    gradeRequestDto.getGradableEventId()));
        }

    }

    private List<Long> gradeTest(TestGradeRequestDto gradeRequestDto, Test gradableEvent) {
        Animal animal = getAnimal(gradeRequestDto.getAnimalId());
        TestGrade grade = (TestGrade) getGrade(TestGrade::new, gradableEvent, animal);

        grade.setXp(gradeRequestDto.getXp());
        List<Long> gradeIds = List.of(gradeRepository.save(grade).getId());
        assignChests(gradeRequestDto, grade);

        return gradeIds;
    }

    private List<Long> gradeAssignment(AssignmentGradeRequestDto gradeRequestDto, Assignment gradableEvent) {
        AssignmentGrade grade = getAssignmentGrade(gradeRequestDto, gradableEvent);

        grade.setXp(gradeRequestDto.getXp());
        List<Long> gradeIds = List.of(gradeRepository.save(grade).getId());
        assignChests(gradeRequestDto, grade);

        return gradeIds;
    }

    private AssignmentGrade getAssignmentGrade(AssignmentGradeRequestDto gradeRequestDto, Assignment gradableEvent) {
        Animal animal = getAnimal(gradeRequestDto.getAnimalId());

        AssignmentGrade grade = (AssignmentGrade) getGrade(AssignmentGrade::new, gradableEvent, animal);

        AssignmentSubmission submission = getAssignmentSubmission(gradableEvent, animal);
        grade.setAssignmentSubmission(submission);
        return grade;
    }

    private List<Long> gradeProject(ProjectGradeRequestDto gradeRequestDto, ProjectCriterion gradableEvent) {
        switch (gradeRequestDto.getGradedTarget()) {
            case AnimalTarget(Long animalId) -> {
                ProjectSubmission submission = getProjectSubmissionStudent(animalId);
                Animal animal = getAnimal(animalId);
                return List.of(gradeProjectByAnimal(submission, gradeRequestDto, gradableEvent, animal));
            }
            case ProjectGroupTarget(Long groupId) -> {
                ProjectSubmission submission = getProjectSubmissionGroup(groupId);
                return gradeProjectByGroup(submission, gradeRequestDto, gradableEvent);
            }
        }
    }

    private Long gradeProjectByAnimal(ProjectSubmission submission, GradeRequestDto gradeRequestDto,
                                      ProjectCriterion gradableEvent, Animal animal) {
        ProjectGrade grade = (ProjectGrade) getGrade(ProjectGrade::new, gradableEvent, animal);

        grade.setXp(gradeRequestDto.getXp());
        grade.setProjectSubmission(submission);

        assignChests(gradeRequestDto, grade);

        return gradeRepository.save(grade).getId();
    }

    private List<Long> gradeProjectByGroup(ProjectSubmission submission, GradeRequestDto gradeRequestDto,
                                           ProjectCriterion gradableEvent) {
        Set<Animal> animals = Optional.ofNullable(submission.getProjectGroup())
                .map(ProjectGroup::getAnimals)
                .orElse(Collections.emptySet());

        return animals.stream().map(animal -> gradeProjectByAnimal(submission, gradeRequestDto, gradableEvent, animal))
                .toList();
    }

    private void assignChests(GradeRequestDto gradeRequestDto, Grade grade) {
        Set<AssignedChest> chestsToRemove = new HashSet<>(
                Optional.ofNullable(grade.getAssignedChests()).orElse(Collections.emptySet())
        );


        List<Long> chestIdsToAdd = markChestsForAddingOrRemoval(gradeRequestDto, chestsToRemove);
        deleteChests(chestsToRemove, grade);

        chestIdsToAdd.forEach(chestId -> addChest(chestId, grade));
    }

    private List<Long> markChestsForAddingOrRemoval(GradeRequestDto gradeRequestDto, Set<AssignedChest> chestsToRemove) {
        List<Long> chestIdsToAdd = new ArrayList<>();

        for (Long chestId : gradeRequestDto.getChestIds()) {
            List<AssignedChest> assignedChests = chestsToRemove.stream()
                    .filter(assignedChest -> assignedChest.getChest().getId().equals(chestId))
                    .sorted(Comparator.comparing(AssignedChest::getReceivedDate))
                    .toList();

            Optional<AssignedChest> assignedChest = assignedChests.stream()
                    .filter(AssignedChest::getOpened)
                    .findFirst();

            if (assignedChest.isPresent()) {
                chestsToRemove.remove(assignedChest.get());
            } else if (!assignedChests.isEmpty()) {
                chestsToRemove.remove(assignedChests.getFirst());
            } else {
                chestIdsToAdd.add(chestId);
            }
        }
        return chestIdsToAdd;
    }

    private void deleteChests(Set<AssignedChest> chestsToRemove, Grade grade) {
        assignedChestRepository.deleteAll(chestsToRemove);
        Optional.ofNullable(grade.getAssignedChests()).orElse(new HashSet<>())
                .removeAll(chestsToRemove);
        gradeRepository.save(grade);
    }

    private void addChest(Long chestId, Grade grade) {
        gradeRequestValidator.validateChestCount(chestId, grade.getAssignedChests(), grade.getGradableEvent().getId());

        Set<AssignedChest> assignedChests = new HashSet<>(
                Optional.ofNullable(grade.getAssignedChests()).orElse(Collections.emptySet())
        );
        Chest chest = getChest(chestId);
        AssignedChest newAssignedChest = new AssignedChest();
        newAssignedChest.setChest(chest);
        newAssignedChest.setGrade(grade);

        assignedChests.add(newAssignedChest);
        assignedChestRepository.save(newAssignedChest);

        grade.setAssignedChests(assignedChests);
        gradeRepository.save(grade);
    }


    private GradableEvent<?> getGradableEvent(Long gradableEventId) {
        return gradableEventRepository.findById(gradableEventId)
                .orElseThrow(() -> new InvalidArgumentException(
                        String.format(DB_OBJECT_NOT_FOUND,
                                FIELD_GRADABLE_EVENT,
                                gradableEventId)
                ));
    }

    private Animal getAnimal(long animalId) {
        return animalRepository.findById(animalId)
                .orElseThrow(() -> new InvalidArgumentException(
                        String.format(DB_OBJECT_NOT_FOUND,
                                FIELD_ANIMAL,
                                animalId)
                ));
    }

    private AssignmentSubmission getAssignmentSubmission(Assignment gradableEvent, Animal animal) {
        return submissionRepository.findByAnimalAndAssignment(animal, gradableEvent)
                .orElseThrow(() -> new InvalidArgumentException(NO_SUBMISSION));
    }

    private ProjectSubmission getProjectSubmissionStudent(Long animalId) {
        return submissionRepository.findProjectSubmissionByAnimalId(animalId)
                .orElseThrow(() -> new InvalidArgumentException(NO_SUBMISSION));
    }

    private ProjectSubmission getProjectSubmissionGroup(Long projectGroupId) {
        return submissionRepository.findProjectSubmissionByProjectGroupId(projectGroupId)
                .orElseThrow(() -> new InvalidArgumentException(NO_SUBMISSION));
    }

    private Chest getChest(Long chestId) {
        return chestRepository.findById(chestId)
                .orElseThrow(() -> new InvalidArgumentException(
                        String.format(DB_OBJECT_NOT_FOUND,
                                FIELD_CHEST,
                                chestId)
                ));
    }

    public Grade getGrade(Supplier<? extends Grade> gradeSupplier, GradableEvent<?> gradableEvent, Animal animal) {
        return getExistingGrade(gradableEvent, animal)
                .orElseGet(() -> {
                    Grade grade = gradeSupplier.get();
                    grade.setAnimal(animal);
                    grade.setGradableEvent(gradableEvent);
                    return grade;
                });
    }

    public Set<Grade> getAnimalGrades(Long animalId) {
        return gradeRepository.findByAnimalId(animalId).orElse(Collections.emptySet());
    }

    public Optional<Grade> getExistingGrade(GradableEvent<?> gradableEvent, Animal animal) {
        return gradeRepository.findByGradableEventIdAndAnimalId(gradableEvent.getId(),
                animal.getId());
    }

    public <T extends GradableEvent<?>> List<Grade> getGradableEventGrades(Set<T> gradableEvents, Animal animal) {
        return gradableEvents.stream()
                .map(assignment -> getExistingGrade(assignment, animal)
                        .orElse(null))
                .filter(Objects::nonNull)
                .toList();
    }
}
