package com.agh.polymorphia_backend.service;

import com.agh.polymorphia_backend.dto.request.grade.GradeRequestDto;
import com.agh.polymorphia_backend.dto.request.grade.GradedObjectType;
import com.agh.polymorphia_backend.dto.request.grade.ProjectGradeRequestDto;
import com.agh.polymorphia_backend.exception.database.InvalidArgumentException;
import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.model.course.reward.Chest;
import com.agh.polymorphia_backend.model.event.gradable.Coursework;
import com.agh.polymorphia_backend.model.event.gradable.GradableEvent;
import com.agh.polymorphia_backend.model.event.gradable.ProjectCriterion;
import com.agh.polymorphia_backend.model.event.gradable.Test;
import com.agh.polymorphia_backend.model.event.submission.CourseworkSubmission;
import com.agh.polymorphia_backend.model.event.submission.ProjectSubmission;
import com.agh.polymorphia_backend.model.grade.CourseworkGrade;
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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static com.agh.polymorphia_backend.service.DbExtractingUtil.*;

@Service
@AllArgsConstructor
public class GradeService {
    private static final String NO_SUBMISSION = "This gradableEvent has no submissions - unable to grade";

    // repositories
    private final GradableEventRepository gradableEventRepository;
    private final GradeRepository gradeRepository;
    private final AnimalRepository animalRepository;
    private final SubmissionRepository submissionRepository;
    private final ChestRepository chestRepository;
    private final AssignedChestRepository assignedChestRepository;

    // validator
    private final GradeRequestValidator gradeRequestValidator;


    public List<Long> grade(GradeRequestDto gradeRequestDto) {
        GradableEvent<?> gradableEvent = getGradableEvent(gradeRequestDto.getGradableEventId());

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Instructor instructor = (Instructor) authentication.getPrincipal();
        gradeRequestValidator.validate(gradeRequestDto, gradableEvent, instructor);

        return switch (gradeRequestDto.getType()) {
            case TEST -> gradeTest(gradeRequestDto, (Test) gradableEvent);
            case COURSEWORK -> gradeCoursework(gradeRequestDto, (Coursework) gradableEvent);
            case PROJECT -> gradeProject((ProjectGradeRequestDto) gradeRequestDto, (ProjectCriterion) gradableEvent);
        };

    }

    private List<Long> gradeTest(GradeRequestDto gradeRequestDto, Test gradableEvent) {
        Animal animal = getAnimal(gradeRequestDto);
        TestGrade grade = (TestGrade) getGrade(TestGrade.builder().build(), gradableEvent, animal);

        grade.setXp(gradeRequestDto.getXp());
        assignChests(gradeRequestDto, grade);

        return List.of(gradeRepository.save(grade).getId());
    }

    private List<Long> gradeCoursework(GradeRequestDto gradeRequestDto, Coursework gradableEvent) {
        CourseworkGrade grade = getCourseworkGrade(gradeRequestDto, gradableEvent);

        grade.setXp(gradeRequestDto.getXp());
        assignChests(gradeRequestDto, grade);

        return List.of(gradeRepository.save(grade).getId());
    }

    private CourseworkGrade getCourseworkGrade(GradeRequestDto gradeRequestDto, Coursework gradableEvent) {
        Animal animal = getAnimal(gradeRequestDto);

        CourseworkGrade grade = (CourseworkGrade) getGrade(CourseworkGrade.builder().build(), gradableEvent, animal);

        CourseworkSubmission submission = getCourseworkSubmission(gradableEvent, animal);
        grade.setCourseworkSubmission(submission);
        return grade;
    }

    private List<Long> gradeProject(ProjectGradeRequestDto gradeRequestDto, ProjectCriterion gradableEvent) {
        if (gradeRequestDto.getGradedObjectType().equals(GradedObjectType.STUDENT)) {
            ProjectSubmission submission = getProjectSubmissionStudent(gradeRequestDto.getGradedObjectId());
            Animal animal = getAnimal(gradeRequestDto);
            return List.of(gradeProjectByAnimal(submission, gradeRequestDto, gradableEvent, animal));
        } else {
            ProjectSubmission submission = getProjectSubmissionGroup(gradeRequestDto.getGradedObjectId());
            return gradeProjectByGroup(submission, gradeRequestDto, gradableEvent);
        }

    }

    private Long gradeProjectByAnimal(ProjectSubmission submission, GradeRequestDto gradeRequestDto,
                                      ProjectCriterion gradableEvent, Animal animal) {
        ProjectGrade grade = (ProjectGrade) getGrade(ProjectGrade.builder().build(), gradableEvent, animal);

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
        if (gradeRequestDto.getChestIds() != null) {
            gradeRequestDto.getChestIds()
                    .forEach(chest -> assignChest(chest, grade));
        }
    }

    private void assignChest(Long chestId, Grade grade) {
        gradeRequestValidator.validateChestCount(chestId, grade);

        Set<AssignedChest> assignedChests = grade.getAssignedChests();
        Chest chest = getChest(chestId);
        AssignedChest newAssignedChest = AssignedChest.builder()
                .chest(chest)
                .grade(grade)
                .build();
        assignedChestRepository.save(newAssignedChest);

        assignedChests.add(newAssignedChest);
        grade.setAssignedChests(assignedChests);
    }


    private GradableEvent<?> getGradableEvent(Long gradableEventId) {
        return gradableEventRepository.findById(gradableEventId)
                .orElseThrow(() -> new InvalidArgumentException(
                        String.format(DB_OBJECT_NOT_FOUND,
                                FIELD_GRADABLE_EVENT,
                                gradableEventId)
                ));
    }

    private Animal getAnimal(GradeRequestDto gradeRequestDto) {
        return animalRepository.findById(gradeRequestDto.getGradedObjectId())
                .orElseThrow(() -> new InvalidArgumentException(
                        String.format(DB_OBJECT_NOT_FOUND,
                                FIELD_ANIMAL,
                                gradeRequestDto.getGradedObjectId())
                ));
    }

    private CourseworkSubmission getCourseworkSubmission(Coursework gradableEvent, Animal animal) {
        return submissionRepository.findByAnimalAndCoursework(animal, gradableEvent)
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

    public Grade getGrade(Grade grade, GradableEvent<?> gradableEvent, Animal animal) {
        return getExistingGrade(gradableEvent, animal)
                .orElse(
                        getNewGrade(grade, gradableEvent, animal)
                );
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
                .map(coursework -> getExistingGrade(coursework, animal)
                        .orElse(null))
                .filter(grade -> grade != null)
                .toList();
    }

    private Grade getNewGrade(Grade grade, GradableEvent<?> gradableEvent, Animal animal) {
        grade.setAnimal(animal);
        grade.setGradableEvent(gradableEvent);
        return grade;
    }

}
