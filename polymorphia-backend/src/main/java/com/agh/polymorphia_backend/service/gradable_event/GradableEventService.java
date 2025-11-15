package com.agh.polymorphia_backend.service.gradable_event;

import com.agh.polymorphia_backend.dto.request.target.TargetRequestDto;
import com.agh.polymorphia_backend.dto.request.target.TargetType;
import com.agh.polymorphia_backend.dto.response.event.BaseGradableEventResponseDto;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.event_section.EventSection;
import com.agh.polymorphia_backend.model.event_section.EventSectionType;
import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import com.agh.polymorphia_backend.model.gradable_event.GradableEventScope;
import com.agh.polymorphia_backend.model.gradable_event.GradableEventSortBy;
import com.agh.polymorphia_backend.model.user.UserType;
import com.agh.polymorphia_backend.repository.gradable_event.GradableEventRepository;
import com.agh.polymorphia_backend.service.course.CourseService;
import com.agh.polymorphia_backend.service.event_section.EventSectionService;
import com.agh.polymorphia_backend.service.mapper.GradableEventMapper;
import com.agh.polymorphia_backend.service.student.AnimalService;
import com.agh.polymorphia_backend.service.user.UserService;
import com.agh.polymorphia_backend.service.validation.AccessAuthorizer;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

import static com.agh.polymorphia_backend.service.user.UserService.INVALID_ROLE;

@Service
@AllArgsConstructor
public class GradableEventService {
    private final GradableEventRepository gradableEventRepository;
    private final AccessAuthorizer accessAuthorizer;
    private final UserService userService;
    private final GradableEventMapper gradableEventMapper;
    private final AnimalService animalService;
    private final CourseService courseService;
    private final EventSectionService eventSectionService;

    public BaseGradableEventResponseDto getGradableEventResponseDto(Long gradableEventId) {
        GradableEvent gradableEvent = getGradableEventById(gradableEventId);

        return gradableEventMapper.toBaseGradableEventResponse(gradableEvent);
    }

    public GradableEvent getGradableEventById(Long gradableEventId) {
        UserType userRole = userService.getCurrentUserRole();
        GradableEvent gradableEvent = fetchGradableEvent(gradableEventId);

        if (userRole != UserType.INSTRUCTOR
                && userRole != UserType.COORDINATOR
                && (gradableEvent.getIsHidden()
                || gradableEvent.getEventSection().getIsHidden())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Gradable event nie istnieje");
        }

        return gradableEvent;
    }

    public void validateTargetGradableEventAccess(TargetRequestDto target, GradableEvent gradableEvent) {
        boolean isInvalidGradableEventForStudentGroupTarget = target.type() == TargetType.STUDENT_GROUP &&
                gradableEvent.getEventSection().getEventSectionType() != EventSectionType.PROJECT;

        if (isInvalidGradableEventForStudentGroupTarget) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Grupowy podmiot oceny jest wspierany jedynie przy projekcie.");
        }
    }

    public List<BaseGradableEventResponseDto> getGradableEvents(Long relatedId, GradableEventScope scope, GradableEventSortBy sortBy) {
        Course course = switch (scope) {
            case COURSE -> courseService.getCourseById(relatedId);
            case EVENT_SECTION -> courseService.getCourseByEventSectionId(relatedId);
        };

        accessAuthorizer.authorizeCourseAccess(course);
        UserType userRole = userService.getUserRoleInCourse(course.getId());

        return switch (userRole) {
            case STUDENT -> getStudentGradableEvents(relatedId, course, scope, sortBy);
            case INSTRUCTOR -> getInstructorGradableEvents(relatedId, scope, sortBy);
            case COORDINATOR -> getCoordinatorGradableEvents(relatedId, scope, sortBy);
            case UNDEFINED -> throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    INVALID_ROLE
            );
        };
    }

    private List<BaseGradableEventResponseDto> getStudentGradableEvents(
            Long relatedId,
            Course course,
            GradableEventScope scope,
            GradableEventSortBy sortBy
    ) {
        Long userId = userService.getCurrentUser().getUserId();
        Long animalId = animalService.getAnimal(userId, course.getId()).getId();

        return gradableEventRepository
                .findStudentGradableEventsWithDetails(relatedId, animalId, scope.getValue(), sortBy.getValue())
                .stream()
                .map(gradableEventMapper::toStudentGradableEventResponseDto)
                .collect(Collectors.toList());
    }

    private List<BaseGradableEventResponseDto> getInstructorGradableEvents(
            Long relatedId,
            GradableEventScope scope,
            GradableEventSortBy sortBy
    ) {
        Long instructorId = userService.getCurrentUser().getUserId();

        return gradableEventRepository
                .findInstructorGradableEventsWithDetails(relatedId, instructorId, scope.getValue(), sortBy.getValue())
                .stream()
                .map(gradableEventMapper::toInstructorGradableEventResponseDto)
                .collect(Collectors.toList());
    }

    private List<BaseGradableEventResponseDto> getCoordinatorGradableEvents(
            Long courseId,
            GradableEventScope scope,
            GradableEventSortBy sortBy
    ) {
        Course course = courseService.getCourseById(courseId);
        accessAuthorizer.authorizeCourseAccess(course);

        return gradableEventRepository
                .getCoordinatorGradableEventsWithDetails(courseId, scope.getValue(), sortBy.getValue())
                .stream()
                .map(gradableEventMapper::toInstructorGradableEventResponseDto)
                .collect(Collectors.toList());
    }


    private GradableEvent fetchGradableEvent(Long gradableEventId) {
        return gradableEventRepository
                .findById(gradableEventId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Gradable event nie istnieje"));
    }
}