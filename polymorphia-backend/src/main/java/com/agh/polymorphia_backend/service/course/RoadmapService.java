package com.agh.polymorphia_backend.service.course;

import com.agh.polymorphia_backend.dto.response.event.BaseGradableEventResponseDto;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import com.agh.polymorphia_backend.service.event_section.EventSectionService;
import com.agh.polymorphia_backend.service.gradable_event.GradableEventService;
import com.agh.polymorphia_backend.service.validation.AccessAuthorizer;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@AllArgsConstructor
public class RoadmapService {

    private final AccessAuthorizer accessAuthorizer;
    private final CourseService courseService;
    private final EventSectionService eventSectionService;
    private final GradableEventService gradableEventService;

    public List<BaseGradableEventResponseDto> getRoadmap(Long courseId) {
        Course course = courseService.getCourseById(courseId);
        accessAuthorizer.authorizeCourseAccess(course);

        return eventSectionService.getCourseEventSections(courseId).stream()
                .map(eventSection -> gradableEventService.getGradableEvents(eventSection.id(), GradableEvent::getRoadMapOrderIndex))
                .flatMap(List::stream)
                .sorted(Comparator.comparing(BaseGradableEventResponseDto::getOrderIndex))
                .toList();
    }
}
