package com.agh.polymorphia_backend.service.validation;

import com.agh.polymorphia_backend.dto.request.grade.GradeRequestDto;
import com.agh.polymorphia_backend.exception.ValidationError;
import com.agh.polymorphia_backend.exception.ValidationException;
import com.agh.polymorphia_backend.exception.ValidationExceptionResponse;
import com.agh.polymorphia_backend.exception.database.InvalidArgumentException;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.course.CourseGroup;
import com.agh.polymorphia_backend.model.event.gradable.GradableEvent;
import com.agh.polymorphia_backend.model.user.Instructor;
import com.agh.polymorphia_backend.repository.course.CourseGroupRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
@AllArgsConstructor
public class GradeRequestValidator {
    private static final String FIELD_GRADABLE_EVENT = "gradableEvent";
    private static final String FIELD_XP = "xp";
    private static final String FIELD_COURSE_GROUP = "CourseGroup";

    private static final String INSTRUCTOR_NOT_IN_GROUP = "Instructor does not manage courseGroup %d!";
    private static final String XP_VALUE_TOO_BIG = "xp value is too big, maximum is %d";
    private static final String INVALID_REQUEST = "Invalid request";
    private static final String DB_OBJECT_NOT_FOUND = "%s of id: %s not found";
    private static final String GRADABLE_EVENT_NOT_IN_COURSE = "GradableEvent is not in this course";


    private final CourseGroupRepository courseGroupRepository;

    public void validate(GradeRequestDto request, GradableEvent event, Instructor instructor) {
        CourseGroup courseGroup = getCourseGroup(request);

        List<ValidationError> errors = Stream.of(
                        validateInstructorInGroup(instructor, courseGroup),
                        validateMaxXpNotExceeded(request, event),
                        validateGradableEventInSameCourseAsCourseGroup(event, courseGroup)
                )
                .flatMap(Optional::stream)
                .toList();


        if (!errors.isEmpty()) {
            throw new ValidationException(
                    ValidationExceptionResponse.builder()
                            .title(INVALID_REQUEST)
                            .validationErrors(errors)
                            .build());
        }
    }


    private Optional<ValidationError> validateInstructorInGroup(Instructor instructor, CourseGroup courseGroup) {
        return instructor.getId().equals(courseGroup.getInstructor().getId())
                ? Optional.empty() :
                Optional.of(ValidationError.builder()
                        .field(FIELD_COURSE_GROUP)
                        .message(String.format(
                                INSTRUCTOR_NOT_IN_GROUP,
                                courseGroup.getId()
                        ))
                        .build());
    }

    private Optional<ValidationError> validateGradableEventInSameCourseAsCourseGroup(GradableEvent event, CourseGroup courseGroup) {
        return event.getEventSection().getCourse().getId().equals(Optional.ofNullable(courseGroup.getCourse()).map(Course::getId).orElse(null))
                ? Optional.empty() :
                Optional.of(ValidationError.builder()
                        .field(FIELD_GRADABLE_EVENT)
                        .message(GRADABLE_EVENT_NOT_IN_COURSE)
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

    private CourseGroup getCourseGroup(GradeRequestDto gradeRequestDto) {
        return courseGroupRepository.findById(gradeRequestDto.courseGroupId())
                .orElseThrow(() -> new InvalidArgumentException(
                        String.format(DB_OBJECT_NOT_FOUND,
                                FIELD_COURSE_GROUP,
                                gradeRequestDto.courseGroupId())
                ));
    }

}
