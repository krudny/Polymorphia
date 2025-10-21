package com.agh.polymorphia_backend.service.event_section;

import com.agh.polymorphia_backend.dto.response.event.EventSectionResponseDto;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.repository.course.event_section.EventSectionRepository;
import com.agh.polymorphia_backend.service.course.CourseService;
import com.agh.polymorphia_backend.service.mapper.EventSectionMapper;
import com.agh.polymorphia_backend.service.validation.AccessAuthorizer;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@AllArgsConstructor
public class EventSectionService {
    private final EventSectionRepository eventSectionRepository;
    private final AccessAuthorizer accessAuthorizer;
    private final CourseService courseService;
    private final EventSectionMapper eventSectionMapper;

    public List<EventSectionResponseDto> getCourseEventSections(Long courseId) {
        Course course = courseService.getCourseById(courseId);
        accessAuthorizer.authorizeCourseAccess(course);

        return eventSectionRepository.findByCourseId(courseId).stream()
                .map(eventSectionMapper::toEventSectionResponseDto)
                .sorted(Comparator.comparing(EventSectionResponseDto::orderIndex))
                .toList();
    }
}
