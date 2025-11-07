package com.agh.polymorphia_backend.service.event_section;

import com.agh.polymorphia_backend.dto.response.event.EventSectionResponseDto;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.event_section.EventSection;
import com.agh.polymorphia_backend.model.user.UserType;
import com.agh.polymorphia_backend.repository.course.event_section.EventSectionRepository;
import com.agh.polymorphia_backend.service.course.CourseService;
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
    private static final String EVENT_SECTION_NOT_FOUND = "Event section not found";
    private final EventSectionRepository eventSectionRepository;
    private final AccessAuthorizer accessAuthorizer;
    private final CourseService courseService;
    private final EventSectionMapper eventSectionMapper;
    private final UserService userService;


    public List<EventSectionResponseDto> getCourseEventSections(Long courseId) {
        Course course = courseService.getCourseById(courseId);
        accessAuthorizer.authorizeCourseAccess(course);

        return eventSectionRepository.findByCourseId(courseId).stream()
                .filter(this::hasAnyUnhiddenGradableEvents)
                .map(eventSectionMapper::toEventSectionResponseDto)
                .sorted(Comparator.comparing(EventSectionResponseDto::orderIndex))
                .toList();
    }

    public EventSection getEventSection(Long eventSectionId) {
        return eventSectionRepository.findById(eventSectionId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, EVENT_SECTION_NOT_FOUND));
    }

    private boolean hasAnyUnhiddenGradableEvents(EventSection eventSection) {
        UserType userRole = userService.getUserRole(userService.getCurrentUser());
        return !eventSection.getGradableEvents().stream()
                .filter(gradableEvent -> userRole == UserType.INSTRUCTOR || userRole == UserType.COORDINATOR || !gradableEvent.getIsHidden())
                .toList()
                .isEmpty();
    }
}
