package com.agh.polymorphia_backend.service.validation;

import com.agh.polymorphia_backend.dto.request.grade.GradeRequestDto;
import com.agh.polymorphia_backend.exception.ValidationError;
import com.agh.polymorphia_backend.exception.ValidationException;
import com.agh.polymorphia_backend.exception.ValidationExceptionResponse;
import com.agh.polymorphia_backend.model.course.CourseGroup;
import com.agh.polymorphia_backend.model.event.gradable.GradableEvent;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
@AllArgsConstructor
public class GradeRequestValidator {
    private static final String FIELD_INSTRUCTOR = "instructorId";
    private static final String FIELD_STUDENT = "studentId";
    private static final String FIELD_XP = "xp";

    private static final String INSTRUCTOR_NOT_IN_GROUP = "Instructor %d does not manage courseGroup %d!";
    private static final String STUDENT_NOT_IN_GROUP = "Student %d is not in courseGroup %d!";
    private static final String XP_VALUE_TOO_BIG = "xp value is too big, maximum is %d";


    public void validate(GradeRequestDto request, GradableEvent event, CourseGroup courseGroup) {
        List<ValidationError> errors = Stream.of(
                        validateInstructorInGroup(request, courseGroup),
                        validateStudentInGroup(request, courseGroup),
                        validateMaxXpNotExceeded(request, event)
                )
                .flatMap(Optional::stream)
                .toList();

        if (!errors.isEmpty()) {
            throw new ValidationException(
                    ValidationExceptionResponse.builder()

                            .build());
        }
    }

    private Optional<ValidationError> validateStudentInGroup(GradeRequestDto request, CourseGroup courseGroup) {
        boolean isStudentInGroup = courseGroup.getAnimals()
                .stream()
                .anyMatch(animal -> animal.getStudent()
                        .getId()
                        .equals(request.studentId()));

        return isStudentInGroup ? Optional.empty() : Optional.of(ValidationError.builder()
                .field(FIELD_STUDENT)
                .message(String.format(
                        STUDENT_NOT_IN_GROUP,
                        request.studentId(),
                        courseGroup.getId()
                ))
                .build());
    }

    // probably user should be able to send only his id, no other,
    // and for not in group should be returned 403
    // to be reconsidered after spring security is set up
    private Optional<ValidationError> validateInstructorInGroup(GradeRequestDto request, CourseGroup courseGroup) {
        return request.instructorId().equals(courseGroup.getInstructor().getId())
                ? Optional.empty() :
                Optional.of(ValidationError.builder()
                        .field(FIELD_INSTRUCTOR)
                        .message(String.format(
                                INSTRUCTOR_NOT_IN_GROUP,
                                request.instructorId(),
                                courseGroup.getId()
                        ))
                        .build());
    }

    private Optional<ValidationError> validateMaxXpNotExceeded(GradeRequestDto request, GradableEvent event) {
        return request.xp() <= event.getMaxXp() ? Optional.empty() : Optional.of(ValidationError.builder()
                .field(FIELD_XP)
                .message(String.format(
                        XP_VALUE_TOO_BIG,
                        event.getMaxXp()
                ))
                .build());
    }

}
