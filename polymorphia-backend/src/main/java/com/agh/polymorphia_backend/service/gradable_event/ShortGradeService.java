package com.agh.polymorphia_backend.service.gradable_event;

import com.agh.polymorphia_backend.dto.request.target.StudentGroupTargetRequestDto;
import com.agh.polymorphia_backend.dto.request.target.StudentTargetRequestDto;
import com.agh.polymorphia_backend.dto.request.target.TargetRequestDto;
import com.agh.polymorphia_backend.dto.response.criteria.CriterionGradeResponseDto;
import com.agh.polymorphia_backend.dto.response.grade.ShortGradeResponseDto;
import com.agh.polymorphia_backend.dto.response.grade.ShortGradeResponseDtoWithType;
import com.agh.polymorphia_backend.dto.response.grade.StudentGroupShortGradeResponseDto;
import com.agh.polymorphia_backend.dto.response.grade.StudentShortGradeResponseDto;
import com.agh.polymorphia_backend.dto.response.user_context.UserDetailsResponseDto;
import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import com.agh.polymorphia_backend.model.gradable_event.Grade;
import com.agh.polymorphia_backend.service.gradable_event.criteria.CriterionGradeService;
import com.agh.polymorphia_backend.service.project.ProjectService;
import com.agh.polymorphia_backend.service.student.AnimalService;
import com.agh.polymorphia_backend.service.validation.AccessAuthorizer;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ShortGradeService {

    private final GradableEventService gradableEventService;
    private final AccessAuthorizer accessAuthorizer;
    private final CriterionGradeService criterionGradeService;
    private final GradeService gradeService;
    private final AnimalService animalService;
    private final ProjectService projectService;

    public ShortGradeResponseDtoWithType getShortGrade(Long gradableEventId, TargetRequestDto targetRequestDto) {
        GradableEvent gradableEvent = gradableEventService.getGradableEventById(gradableEventId);
        gradableEventService.validateTargetGradableEventAccess(targetRequestDto, gradableEvent);
        ShortGradeResponseDto grade = switch (targetRequestDto.type()) {
            case STUDENT -> getShortGradeStudent(gradableEvent, ((StudentTargetRequestDto) targetRequestDto).id());
            case STUDENT_GROUP ->
                    getShortGroupGrade(gradableEvent, ((StudentGroupTargetRequestDto) targetRequestDto).groupId());
        };

        return ShortGradeResponseDtoWithType.builder()
                .targetType(targetRequestDto.type())
                .gradeResponse(grade)
                .build();
    }

    private StudentShortGradeResponseDto getShortGradeStudent(GradableEvent gradableEvent, Long studentId) {
        Course course = gradableEvent.getEventSection().getCourse();

        accessAuthorizer.authorizeStudentDataAccess(course, studentId);
        return getShortGradeWithoutAuthorization(gradableEvent, studentId, course);
    }

    public StudentShortGradeResponseDto getShortGradeWithoutAuthorization(GradableEvent gradableEvent, Long studentId, Course course) {
        Animal animal = animalService.getAnimal(studentId, course.getId());
        Optional<Grade> grade = gradeService.getGradeByAnimalIdAndGradableEventId(animal.getId(), gradableEvent.getId());
        List<CriterionGradeResponseDto> criteriaGrades = grade.map(criterionGradeService::getCriteriaGrades)
                .orElse(Collections.emptyList());
        Boolean hasReward = !criteriaGrades
                .stream()
                .filter(cg -> !cg.getAssignedRewards().isEmpty())
                .toList()
                .isEmpty();

        return StudentShortGradeResponseDto.builder().isGraded(grade.isPresent())
                .id(grade.map(Grade::getId).orElse(null)).comment(grade.map(Grade::getComment).orElse(null))
                .hasReward(hasReward).criteria(criteriaGrades).build();
    }


    private StudentGroupShortGradeResponseDto getShortGroupGrade(GradableEvent gradableEvent, Long groupId) {
        List<UserDetailsResponseDto> projectGroupStudents = projectService.getProjectGroup(groupId, gradableEvent.getId());
        List<StudentShortGradeResponseDto> shortGrades = projectGroupStudents.stream()
                .map(student -> getShortGradeStudent(gradableEvent, student.getUserDetails().getId()))
                .toList();

        List<Long> ids = shortGrades.stream()
                .map(StudentShortGradeResponseDto::getId)
                .filter(Objects::nonNull)
                .toList();

        if (ids.isEmpty()) {
            return StudentGroupShortGradeResponseDto.builder()
                    .isGraded(false)
                    .build();
        }

        if (!areAllGradesSame(shortGrades)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Oceny członków grupy się różnią!");
        }


        return StudentGroupShortGradeResponseDto.builder()
                .ids(ids)
                .isGraded(shortGrades.getFirst().getIsGraded())
                .comment(shortGrades.getFirst().getComment())
                .hasReward(shortGrades.getFirst().getHasReward())
                .criteria(shortGrades.getFirst().getCriteria())
                .build();
    }

    public boolean areAllGradesSame(List<StudentShortGradeResponseDto> grades) {
        return grades.stream()
                .map(g -> ShortGradeResponseDto.builder()
                        .hasReward(g.getHasReward())
                        .isGraded(g.getIsGraded())
                        .comment(g.getComment())
                        .criteria(g.getCriteria())
                        .build()
                )
                .distinct()
                .count() <= 1;
    }
}
