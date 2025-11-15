package com.agh.polymorphia_backend.service.event_section;

import com.agh.polymorphia_backend.dto.response.event.EventSectionResponseDto;
import com.agh.polymorphia_backend.model.event_section.EventSection;
import com.agh.polymorphia_backend.model.user.UserType;
import com.agh.polymorphia_backend.repository.event_section.EventSectionRepository;
import com.agh.polymorphia_backend.service.mapper.EventSectionMapper;
import com.agh.polymorphia_backend.service.user.UserService;
import com.agh.polymorphia_backend.service.validation.AccessAuthorizer;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Comparator;
import java.util.List;

@Service
@AllArgsConstructor
public class EventSectionService {
    private static final String EVENT_SECTION_NOT_FOUND = "Nie znaleziono kategorii";
    private final EventSectionRepository eventSectionRepository;
    private final AccessAuthorizer accessAuthorizer;
    private final EventSectionMapper eventSectionMapper;
    private final UserService userService;

    public List<EventSectionResponseDto> getCourseEventSectionsResponseDto(Long courseId) {
        return getCourseEventSections(courseId).stream()
                .map(eventSectionMapper::toEventSectionResponseDto)
                .sorted(Comparator.comparing(EventSectionResponseDto::orderIndex))
                .toList();
    }

    public EventSection getEventSectionFromGradableEventId(Long gradableEventId) {
        return eventSectionRepository.findByGradableEventsId(gradableEventId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, EVENT_SECTION_NOT_FOUND));
    }

    public List<EventSection> getCourseEventSections(Long courseId) {
        accessAuthorizer.authorizeCourseAccess(courseId);
        UserType userRole = userService.getUserRoleInCourse(courseId);

        List<EventSection> eventSections = eventSectionRepository.findByCourseId(courseId);

        if (userRole != UserType.INSTRUCTOR && userRole != UserType.COORDINATOR) {
            eventSections = eventSections.stream()
                    .filter(eventSection -> !eventSection.getIsHidden())
                    .filter(this::hasAnyUnhiddenGradableEvents)
                    .toList();
        }

        return eventSections.stream()
                .sorted(Comparator.comparing(EventSection::getOrderIndex))
                .toList();
    }

    public EventSection getEventSection(Long eventSectionId) {
        EventSection eventSection = fetchEventSection(eventSectionId);
        UserType userRole = userService.getCurrentUserRole();

        if (userRole != UserType.INSTRUCTOR && userRole != UserType.COORDINATOR && eventSection.getIsHidden()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, EVENT_SECTION_NOT_FOUND);
        }

        return eventSection;
    }

    private EventSection fetchEventSection(Long eventSectionId) {
        return eventSectionRepository.findById(eventSectionId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, EVENT_SECTION_NOT_FOUND));
    }

    private boolean hasAnyUnhiddenGradableEvents(EventSection eventSection) {
        UserType userRole = userService.getCurrentUserRole();
        if ((userRole == UserType.INSTRUCTOR || userRole == UserType.COORDINATOR) && !eventSection.getGradableEvents().isEmpty()) {
            return true;
        }
        return eventSection.getGradableEvents().stream()
                .anyMatch(gradableEvent -> !gradableEvent.getIsHidden());
    }
}
