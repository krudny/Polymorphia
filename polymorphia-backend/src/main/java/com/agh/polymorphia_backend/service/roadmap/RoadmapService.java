package com.agh.polymorphia_backend.service.roadmap;

import com.agh.polymorphia_backend.dto.response.event.BaseGradableEventResponseDto;
import com.agh.polymorphia_backend.model.event_section.EventSection;
import com.agh.polymorphia_backend.model.gradable_event.GradableEventScope;
import com.agh.polymorphia_backend.model.gradable_event.GradableEventSortBy;
import com.agh.polymorphia_backend.model.user.UserType;
import com.agh.polymorphia_backend.service.event_section.EventSectionService;
import com.agh.polymorphia_backend.service.gradable_event.GradableEventService;
import com.agh.polymorphia_backend.service.user.UserService;
import com.agh.polymorphia_backend.service.validation.AccessAuthorizer;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@AllArgsConstructor
public class RoadmapService {
    private final AccessAuthorizer accessAuthorizer;
    private final EventSectionService eventSectionService;
    private final GradableEventService gradableEventService;
    private final UserService userService;

    public List<BaseGradableEventResponseDto> getRoadmap(Long courseId) {
        accessAuthorizer.authorizeCourseAccess(courseId);

        return gradableEventService.getGradableEvents(courseId, GradableEventScope.COURSE, GradableEventSortBy.ROADMAP_ORDER_INDEX);

    }
}
