package com.agh.polymorphia_backend.service.validation;

import com.agh.polymorphia_backend.dto.request.grade.GradeRequestDto;
import com.agh.polymorphia_backend.exception.ValidationError;
import com.agh.polymorphia_backend.exception.ValidationException;
import com.agh.polymorphia_backend.exception.ValidationExceptionResponse;
import com.agh.polymorphia_backend.exception.database.InvalidArgumentException;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.course.CourseGroup;
import com.agh.polymorphia_backend.model.event.gradable.GradableEvent;
import com.agh.polymorphia_backend.model.grade.Grade;
import com.agh.polymorphia_backend.model.user.Instructor;
import com.agh.polymorphia_backend.repository.course.CourseGroupRepository;
import com.agh.polymorphia_backend.repository.event.gradable.GradableEventRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
@AllArgsConstructor
public class GradeRequestValidator {
    private static final String FIELD_GRADABLE_EVENT = "gradableEvent";
    private static final String FIELD_XP = "xp";
    private static final String FIELD_COURSE_GROUP = "CourseGroup";
    private static final String FIELD_CHEST = "chestIds";

    private static final String INSTRUCTOR_NOT_IN_GROUP = "Instructor does not manage courseGroup %d!";
    private static final String XP_VALUE_TOO_BIG = "xp value is too big, maximum is %d";
    private static final String INVALID_REQUEST = "Invalid request";
    private static final String DB_OBJECT_NOT_FOUND = "%s of id: %s not found";
    private static final String GRADABLE_EVENT_NOT_IN_COURSE = "GradableEvent is not in this course";
    private static final String NO_CHEST_IDS_AND_XP = "Either chestIds or xp are required";
    private static final String TOO_MANY_CHESTS = "Maximum value of chests (%d) with id %d has already been assigned to this grade";

    // repository
    private final CourseGroupRepository courseGroupRepository;
    private final GradableEventRepository gradableEventRepository;


    public void validate(GradeRequestDto request, GradableEvent<?> event, Instructor instructor) {
        CourseGroup courseGroup = getCourseGroup(request.getCourseGroupId());

        List<ValidationError> errors = Stream.of(
                        validateInstructorInGroup(instructor, courseGroup),
                        validateXpOrChestIdsPresent(request),
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

    public void validateChestCount(Long chestId, Grade grade) {
        long assignedChestsCount = Optional.ofNullable(grade.getAssignedChests())
                .orElse(Collections.emptySet())
                .stream()
                .filter(assignedChest -> assignedChest.getChest().getId().equals(chestId))
                .count();

        Optional<Integer> maxChests = gradableEventRepository.findMaxChestsByGradableEventIdAndChestId(
                grade.getGradableEvent().getId(),
                chestId
        );

        if (maxChests.isEmpty() || assignedChestsCount >= maxChests.get()) {
            throw new InvalidArgumentException(String.format(
                    TOO_MANY_CHESTS,
                    maxChests.orElse(0),
                    chestId
            ));
        }
    }

    private Optional<ValidationError> validateXpOrChestIdsPresent(GradeRequestDto request) {
        return request.getChestIds() != null || request.getXp() != null
                ? Optional.empty() :
                Optional.of(ValidationError.builder()
                        .field(String.format("%s,%s", FIELD_XP, FIELD_CHEST))
                        .message(NO_CHEST_IDS_AND_XP)
                        .build());
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

    private Optional<ValidationError> validateGradableEventInSameCourseAsCourseGroup(GradableEvent<?> event, CourseGroup courseGroup) {
        return event.getEventSection().getCourse().getId().equals(Optional.ofNullable(courseGroup.getCourse()).map(Course::getId).orElse(null))
                ? Optional.empty() :
                Optional.of(ValidationError.builder()
                        .field(FIELD_GRADABLE_EVENT)
                        .message(GRADABLE_EVENT_NOT_IN_COURSE)
                        .build());
    }


    private Optional<ValidationError> validateMaxXpNotExceeded(GradeRequestDto request, GradableEvent<?> event) {
        return Optional.ofNullable(request.getXp()).orElse(0) <= event.getMaxXp() ? Optional.empty() : Optional.of(ValidationError.builder()
                .field(FIELD_XP)
                .message(String.format(
                        XP_VALUE_TOO_BIG,
                        event.getMaxXp()
                ))
                .build());
    }


    private CourseGroup getCourseGroup(Long courseGroupId) {
        return courseGroupRepository.findById(courseGroupId)
                .orElseThrow(() -> new InvalidArgumentException(
                        String.format(DB_OBJECT_NOT_FOUND,
                                FIELD_COURSE_GROUP,
                                courseGroupId)
                ));
    }

}
