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

import static com.agh.polymorphia_backend.service.user.UserService.INVALID_ROLE;

@Service
@AllArgsConstructor
public class EventSectionService {
    private static final String EVENT_SECTION_NOT_FOUND = "Nie znaleziono kategorii";
    private final EventSectionRepository eventSectionRepository;
    private final AccessAuthorizer accessAuthorizer;
    private final EventSectionMapper eventSectionMapper;
    private final UserService userService;

    public List<EventSectionResponseDto> getCourseEventSectionsResponseDto(Long courseId) {
        accessAuthorizer.authorizeCourseAccess(courseId);

        return getCourseEventSections(courseId).stream()
                .map(eventSectionMapper::toEventSectionResponseDto)
                .sorted(Comparator.comparing(EventSectionResponseDto::orderIndex))
                .toList();
    }

    public EventSection getEventSection(Long eventSectionId) {
        EventSection eventSection = eventSectionRepository.findById(eventSectionId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, EVENT_SECTION_NOT_FOUND));
        UserType userRole = userService.getCurrentUserRole();

        if (userRole == UserType.STUDENT && Boolean.TRUE.equals(eventSection.getIsHidden())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, EVENT_SECTION_NOT_FOUND);
        }

        return eventSection;
    }

    private List<EventSection> getCourseEventSections(Long courseId) {
        UserType userRole = userService.getUserRoleInCourse(courseId);

        return switch (userRole) {
            case STUDENT -> eventSectionRepository.findByCourseIdWithHidden(courseId);
            case INSTRUCTOR, COORDINATOR -> eventSectionRepository.findByCourseIdWithoutHidden(courseId);
            case UNDEFINED -> throw new IllegalArgumentException(INVALID_ROLE);
        };
    }
}
