package com.agh.polymorphia_backend.service.grade;

import com.agh.polymorphia_backend.dto.request.grade.CriterionGradeRequestDto;
import com.agh.polymorphia_backend.dto.request.grade.GradeRequestDto;
import com.agh.polymorphia_backend.dto.request.reward.ShortAssignedRewardRequestDto;
import com.agh.polymorphia_backend.dto.request.target.StudentGroupTargetRequestDto;
import com.agh.polymorphia_backend.dto.request.target.StudentTargetRequestDto;
import com.agh.polymorphia_backend.dto.request.target.TargetRequestDto;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.criterion.CriterionGrade;
import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import com.agh.polymorphia_backend.model.grade.Grade;
import com.agh.polymorphia_backend.model.project.ProjectGroup;
import com.agh.polymorphia_backend.model.reward.RewardType;
import com.agh.polymorphia_backend.model.reward.assigned.AssignedChest;
import com.agh.polymorphia_backend.model.reward.assigned.AssignedItem;
import com.agh.polymorphia_backend.model.reward.assigned.AssignedReward;
import com.agh.polymorphia_backend.model.user.student.Animal;
import com.agh.polymorphia_backend.model.user.student.Student;
import com.agh.polymorphia_backend.service.criteria.CriterionGradeService;
import com.agh.polymorphia_backend.service.gradable_event.GradableEventService;
import com.agh.polymorphia_backend.service.project.ProjectGroupService;
import com.agh.polymorphia_backend.service.reward.AssignedRewardService;
import com.agh.polymorphia_backend.service.reward.BonusXpCalculator;
import com.agh.polymorphia_backend.service.student.AnimalService;
import com.agh.polymorphia_backend.service.validation.AccessAuthorizer;
import com.agh.polymorphia_backend.service.validation.GradingValidator;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class GradingService {

    private final GradableEventService gradableEventService;
    private final AccessAuthorizer accessAuthorizer;
    private final BonusXpCalculator bonusXpCalculator;
    private final AnimalService animalService;
    private final GradingValidator gradingValidator;
    private final AssignedRewardService assignedRewardService;
    private final GradeService gradeService;
    private final ProjectGroupService projectGroupService;
    private final CriterionGradeService criterionGradeService;

    @Transactional
    public void submitGrade(GradeRequestDto request) {
        GradableEvent gradableEvent = gradableEventService.getGradableEventById(request.getGradableEventId());
        Course course = gradableEvent.getEventSection().getCourse();

        accessAuthorizer.authorizeCourseAccess(course);
        gradableEventService.validateTargetGradableEventAccess(request.getTarget(), gradableEvent);

        TargetRequestDto target = request.getTarget();
        switch (target.type()) {
            case STUDENT -> validateAndGetStudentGrade(request, gradableEvent, course);
            case STUDENT_GROUP -> validateAndGetGroupGrades(request, gradableEvent, course);
        }

    }

    private List<Grade> validateAndGetGroupGrades(GradeRequestDto request, GradableEvent gradableEvent, Course course) {
        Long groupId = ((StudentGroupTargetRequestDto) request.getTarget()).groupId();
        ProjectGroup projectGroup = projectGroupService.findById(groupId);
        List<Student> students = projectGroupService.getStudentsFromProjectGroup(projectGroup);

        accessAuthorizer.authorizeProjectGroupGrading(projectGroup);
        gradingValidator.validate(request, gradableEvent);

        return students.stream()
                .map(student -> getStudentGrade(
                        getStudentGradeRequest(request, student.getUserId()), gradableEvent, course)
                )
                .toList();
    }

    private Grade validateAndGetStudentGrade(GradeRequestDto request, GradableEvent gradableEvent, Course course) {
        accessAuthorizer.authorizeStudentDataAccess(gradableEvent.getEventSection().getCourse(), ((StudentTargetRequestDto) request.getTarget()).id());
        gradingValidator.validate(request, gradableEvent);

        return getStudentGrade(request, gradableEvent, course);
    }

    private Grade getStudentGrade(GradeRequestDto request, GradableEvent gradableEvent, Course course) {
        StudentTargetRequestDto target = (StudentTargetRequestDto) request.getTarget();
        Animal animal = animalService.getAnimal(target.id(), course.getId());
        Grade grade = gradeService.getOrCreateGrade(animal, gradableEvent, request.getComment());

        List<CriterionGrade> criteriaGrades = gradableEvent.getCriteria().stream()
                .map(
                        criterion -> {
                            BigDecimal gainedXp =
                                    Optional.ofNullable(request.getCriteria().get(criterion.getId()))
                                            .map(CriterionGradeRequestDto::getGainedXp)
                                            .orElse(BigDecimal.valueOf(0.0));

                            return criterionGradeService.fetchOrCreateCriterionGrade(
                                    criterion.getId(),
                                    gainedXp,
                                    grade
                            );
                        }
                )
                .collect(Collectors.toList());
        grade.getCriteriaGrades().clear();
        grade.getCriteriaGrades().addAll(criteriaGrades);
        grade.setComment(request.getComment());

        gradeService.saveGrade(grade);
        criterionGradeService.saveAll(criteriaGrades);
        createAndSaveAssignedRewards(criteriaGrades, request.getCriteria());

        bonusXpCalculator.updateAnimalFlatBonusXp(animal.getId());

        return grade;
    }

    private void createAndSaveAssignedRewards(List<CriterionGrade> criteriaGrades, Map<Long, CriterionGradeRequestDto> criteria) {
        List<AssignedReward> assignedRewards = new ArrayList<>();

        for (CriterionGrade criterionGrade : criteriaGrades) {
            CriterionGradeRequestDto gradeRequest = criteria.getOrDefault(criterionGrade.getCriterion().getId(),
                    CriterionGradeRequestDto.builder()
                            .gainedXp(BigDecimal.valueOf(0.0))
                            .assignedRewards(Collections.emptyList())
                            .build()
            );
            List<AssignedReward> criterionAssignedRewards = new ArrayList<>();

            for (ShortAssignedRewardRequestDto request : gradeRequest.getAssignedRewards()) {
                List<AssignedReward> rewards = assignedRewardService.fetchOrCreateAssignedRewards(request, criterionGrade);
                criterionAssignedRewards.addAll(rewards);

            }
            assignedRewards.addAll(criterionAssignedRewards);
            criterionGrade.getAssignedRewards().clear();
            criterionGrade.getAssignedRewards().addAll(criterionAssignedRewards);
        }

        List<AssignedChest> assignedChests = assignedRewards.stream()
                .filter(ar -> ar.getType().equals(RewardType.CHEST))
                .map(ar -> (AssignedChest) ar)
                .toList();

        List<AssignedItem> assignedItems = assignedRewards.stream()
                .filter(ar -> ar.getType().equals(RewardType.ITEM))
                .map(ar -> (AssignedItem) ar)
                .toList();

        assignedRewardService.saveAssignedChest(assignedChests);
        assignedRewardService.saveAssignedItems(assignedItems);
        criterionGradeService.saveAll(criteriaGrades);
    }

    private GradeRequestDto getStudentGradeRequest(GradeRequestDto request, Long studentId) {
        return request.toBuilder()
                .target(
                        StudentTargetRequestDto.builder()
                                .id(studentId)
                                .build()
                )
                .build();
    }


}
