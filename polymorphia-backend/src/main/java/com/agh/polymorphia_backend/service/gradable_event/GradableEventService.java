package com.agh.polymorphia_backend.service.gradable_event;

import com.agh.polymorphia_backend.dto.request.target.TargetRequestDto;
import com.agh.polymorphia_backend.dto.request.target.TargetType;
import com.agh.polymorphia_backend.dto.response.criteria.CriterionResponseDto;
import com.agh.polymorphia_backend.dto.response.event.BaseGradableEventResponseDto;
import com.agh.polymorphia_backend.dto.response.event.StudentGradableEventResponseDto;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.event_section.EventSection;
import com.agh.polymorphia_backend.model.event_section.EventSectionType;
import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import com.agh.polymorphia_backend.model.user.AbstractRoleUser;
import com.agh.polymorphia_backend.model.user.UserType;
import com.agh.polymorphia_backend.repository.gradable_event.GradableEventRepository;
import com.agh.polymorphia_backend.repository.gradable_event.projections.StudentGradableEventProjection;
import com.agh.polymorphia_backend.service.event_section.EventSectionService;
import com.agh.polymorphia_backend.service.mapper.CriterionMapper;
import com.agh.polymorphia_backend.service.mapper.GradableEventMapper;
import com.agh.polymorphia_backend.service.student.AnimalService;
import com.agh.polymorphia_backend.service.user.UserService;
import com.agh.polymorphia_backend.service.validation.AccessAuthorizer;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

import static com.agh.polymorphia_backend.service.user.UserService.INVALID_ROLE;

@Service
@AllArgsConstructor
public class GradableEventService {
    private final GradableEventRepository gradableEventRepository;
    private final AccessAuthorizer accessAuthorizer;
    private final EventSectionService eventSectionService;
    private final UserService userService;
    private final GradableEventMapper gradableEventMapper;
    private final AnimalService animalService;
    private final CriterionMapper criterionMapper;

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

    public List<BaseGradableEventResponseDto> getGradableEvents(Long eventSectionId) {
        EventSection eventSection = eventSectionService.getEventSection(eventSectionId);
        Course course = eventSection.getCourse();
        accessAuthorizer.authorizeCourseAccess(course);

        UserType userRole = userService.getUserRoleInCourse(course.getId());

        String sortBy = "ORDER_INDEX";

        return switch (userRole) {
            case STUDENT -> getStudentGradableEvents(eventSection, course, sortBy);
            case INSTRUCTOR, COORDINATOR -> getInstructorGradableEvents(eventSection, sortBy);
            case UNDEFINED -> throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    INVALID_ROLE
            );
        };
    }

    private List<BaseGradableEventResponseDto> getStudentGradableEvents(
            EventSection eventSection,
            Course course,
            String sortBy
    ) {
        Long userId = userService.getCurrentUser().getUserId();
        Long animalId = animalService.getAnimal(userId, course.getId()).getId();

        return gradableEventRepository
                .findStudentGradableEventsWithDetails(eventSection.getId(), animalId, sortBy)
                .stream()
                .map(projection -> gradableEventMapper.toStudentGradableEventResponseDto(
                        projection,
                        eventSection.getEventSectionType()
                ))
                .collect(Collectors.toList());
    }

    private List<BaseGradableEventResponseDto> getInstructorGradableEvents(
            EventSection eventSection,
            String sortBy
    ) {
        Long instructorId = userService.getCurrentUser().getUserId();

        return gradableEventRepository
                .findInstructorGradableEventsWithDetails(eventSection.getId(), instructorId, sortBy)
                .stream()
                .map(projection -> gradableEventMapper.toInstructorGradableEventResponseDto(
                        projection,
                        eventSection.getEventSectionType()
                ))
                .collect(Collectors.toList());
    }

    private GradableEvent fetchGradableEvent(Long gradableEventId) {
        return gradableEventRepository
                .findById(gradableEventId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Gradable event nie istnieje"));
    }
}