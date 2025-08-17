//package com.agh.polymorphia_backend.service.validation;
//
//import com.agh.polymorphia_backend.dto.request.grade.GradeRequestDto;
//import com.agh.polymorphia_backend.exception.ValidationError;
//import com.agh.polymorphia_backend.exception.ValidationException;
//import com.agh.polymorphia_backend.exception.ValidationExceptionResponse;
//import com.agh.polymorphia_backend.exception.database.InvalidArgumentException;
//import com.agh.polymorphia_backend.model.course.CourseGroup;
//import com.agh.polymorphia_backend.model.event.gradable.GradableEvent;
//import com.agh.polymorphia_backend.model.grade.reward.AssignedChest;
//import com.agh.polymorphia_backend.model.user.Instructor;
//import com.agh.polymorphia_backend.repository.course.CourseGroupRepository;
//import com.agh.polymorphia_backend.repository.event.gradable.GradableEventRepository;
//import lombok.AllArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.math.BigDecimal;
//import java.util.Collections;
//import java.util.List;
//import java.util.Optional;
//import java.util.Set;
//import java.util.stream.Stream;
//
//@Service
//@AllArgsConstructor
//public class GradeRequestValidator {
//    private static final String FIELD_GRADABLE_EVENT = "gradableEvent";
//    private static final String FIELD_XP = "xp";
//    private static final String FIELD_COURSE_GROUP = "CourseGroup";
//
//    private static final String INSTRUCTOR_NOT_IN_GROUP = "Instructor does not manage courseGroup %d!";
//    private static final String XP_VALUE_TOO_BIG = "xp value is too big, maximum is %.1f";
//    private static final String INVALID_REQUEST = "Invalid request";
//    private static final String DB_OBJECT_NOT_FOUND = "%s of id: %s not found";
//    private static final String GRADABLE_EVENT_NOT_IN_COURSE = "GradableEvent is not in this course";
//    private static final String TOO_MANY_CHESTS = "Maximum number of chests with id %d is %d";
//    private static final String CHESTS_NOT_IN_GRADABLE_EVENT = "It is not allowed to assign chest %d to this gradableEvent";
//
//
//    private final CourseGroupRepository courseGroupRepository;
//    private final GradableEventRepository gradableEventRepository;
//
//
//    public void validate(GradeRequestDto request, GradableEvent<?> event, Instructor instructor) {
//        CourseGroup courseGroup = getCourseGroup(request.getCourseGroupId());
//
//        List<ValidationError> errors = Stream.of(
//                        validateInstructorInGroup(instructor, courseGroup),
//                        validateMaxXpNotExceeded(request, event),
//                        validateGradableEventInSameCourseAsCourseGroup(event, courseGroup)
//                )
//
//                .flatMap(Optional::stream)
//                .toList();
//
//
//        if (!errors.isEmpty()) {
//            throw new ValidationException(
//                    ValidationExceptionResponse.builder()
//                            .title(INVALID_REQUEST)
//                            .validationErrors(errors)
//                            .build());
//        }
//    }
//
//    public void validateChestCount(Long chestId, Set<AssignedChest> assignedChests, Long gradableEventId) {
//        long assignedChestsCount = Optional.ofNullable(assignedChests)
//                .orElse(Collections.emptySet())
//                .stream()
//                .filter(assignedChest -> assignedChest.getChest().getId().equals(chestId))
//                .count();
//
//        Integer maxChests = gradableEventRepository.findMaxChestsByGradableEventIdAndChestId(
//                gradableEventId,
//                chestId
//        ).orElseThrow(() -> new InvalidArgumentException(String.format(CHESTS_NOT_IN_GRADABLE_EVENT, chestId)));
//
//        if (assignedChestsCount >= maxChests) {
//            throw new InvalidArgumentException(String.format(
//                    TOO_MANY_CHESTS,
//                    maxChests,
//                    chestId
//            ));
//        }
//    }
//
//
//
//    private Optional<ValidationError> validateInstructorInGroup(Instructor instructor, CourseGroup courseGroup) {
//        return instructor.getId().equals(courseGroup.getInstructor().getId())
//                ? Optional.empty() :
//                Optional.of(ValidationError.builder()
//                        .field(FIELD_COURSE_GROUP)
//                        .message(String.format(
//                                INSTRUCTOR_NOT_IN_GROUP,
//                                courseGroup.getId()
//                        ))
//                        .build());
//    }
//
//    private Optional<ValidationError> validateGradableEventInSameCourseAsCourseGroup(GradableEvent<?> event, CourseGroup courseGroup) {
//        return event.getEventSection().getCourse().getId().equals(courseGroup.getCourse().getId())
//                ? Optional.empty() :
//                Optional.of(ValidationError.builder()
//                        .field(FIELD_GRADABLE_EVENT)
//                        .message(GRADABLE_EVENT_NOT_IN_COURSE)
//                        .build());
//    }
//
//
//    private Optional<ValidationError> validateMaxXpNotExceeded(GradeRequestDto request, GradableEvent<?> event) {
//        return Optional.ofNullable(request.getXp()).orElse(BigDecimal.ZERO).compareTo(event.getMaxXp()) <= 0 ? Optional.empty() : Optional.of(ValidationError.builder()
//                .field(FIELD_XP)
//                .message(String.format(
//                        XP_VALUE_TOO_BIG,
//                        event.getMaxXp()
//                ))
//                .build());
//    }
//
//
//    private CourseGroup getCourseGroup(Long courseGroupId) {
//        return courseGroupRepository.findById(courseGroupId)
//                .orElseThrow(() -> new InvalidArgumentException(
//                        String.format(DB_OBJECT_NOT_FOUND,
//                                FIELD_COURSE_GROUP,
//                                courseGroupId)
//                ));
//    }
//
//}
