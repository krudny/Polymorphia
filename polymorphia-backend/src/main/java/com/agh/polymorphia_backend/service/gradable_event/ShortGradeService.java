package com.agh.polymorphia_backend.service.gradable_event;

import com.agh.polymorphia_backend.dto.request.grade.target.StudentGroupTargetRequestDto;
import com.agh.polymorphia_backend.dto.request.grade.target.StudentTargetRequestDto;
import com.agh.polymorphia_backend.dto.request.grade.target.TargetRequestDto;
import com.agh.polymorphia_backend.dto.response.criteria.CriterionGradeResponseDto;
import com.agh.polymorphia_backend.dto.response.grade.ShortGradeResponseDto;
import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import com.agh.polymorphia_backend.model.gradable_event.Grade;
import com.agh.polymorphia_backend.service.gradable_event.criteria.CriterionGradeService;
import com.agh.polymorphia_backend.service.student.AnimalService;
import com.agh.polymorphia_backend.service.validation.AccessAuthorizer;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ShortGradeService {

    private final GradableEventService gradableEventService;
    private final AccessAuthorizer accessAuthorizer;
    private final CriterionGradeService criterionGradeService;
    private final GradeService gradeService;
    private final AnimalService animalService;

    public ShortGradeResponseDto getShortGrade(Long gradableEventId, TargetRequestDto targetRequestDto) {
        return switch (targetRequestDto.getType()) {
            case STUDENT -> getShortStudentGrade(gradableEventId, ((StudentTargetRequestDto) targetRequestDto).getId());
            case STUDENT_GROUP ->
                    getShortGroupGrade(gradableEventId, ((StudentGroupTargetRequestDto) targetRequestDto).getGroupId());
        };
    }

    private ShortGradeResponseDto getShortStudentGrade(Long gradableEventId, Long id) {
        GradableEvent gradableEvent = gradableEventService.getGradableEventById(gradableEventId);
        Course course = gradableEvent.getEventSection().getCourse();
        accessAuthorizer.authorizeCourseAccess(course);
        Animal animal = animalService.getAnimal(id, course.getId());
        Optional<Grade> grade = gradeService.getGradeByAnimalIdAndGradableEventId(animal.getId(), gradableEventId);
        List<CriterionGradeResponseDto> criteriaGrades = grade.map(criterionGradeService::getCriteriaGrades).orElse(null);
        // check if authorized to access this user's data

        return ShortGradeResponseDto.builder()
                .isGraded(grade.isPresent())
                .id(grade.map(Grade::getId).orElse(null))
                .comment(grade.map(Grade::getComment).orElse(null))
                .criteria(criteriaGrades)
                .build();


    }

    private ShortGradeResponseDto getShortGroupGrade(Long gradableEventId, Long groupId) {
        // check if authorized to access this user's data
        // check if id is project
        // get all grades from group and compare them, if different throw error
        return null;
    }
}
