package com.agh.polymorphia_backend.service.target_list;

import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import com.agh.polymorphia_backend.model.user.UserType;
import com.agh.polymorphia_backend.service.course_groups.CourseGroupsService;
import com.agh.polymorphia_backend.service.gradable_event.GradableEventService;
import com.agh.polymorphia_backend.service.user.UserService;
import com.agh.polymorphia_backend.service.validation.AccessAuthorizer;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TargetListService {
    private final GradableEventService gradableEventService;
    private final AccessAuthorizer accessAuthorizer;
    private final CourseGroupsService courseGroupsService;
    private final UserService userService;

    public List<String> getGroupsForGradingTargetListFilters(Long gradableEventId) {
        GradableEvent gradableEvent = gradableEventService.getGradableEventById(gradableEventId);
        Course course = gradableEvent.getEventSection().getCourse();

        return switch (gradableEvent.getEventSection().getEventSectionType()) {
            // Course access authorization is performed inside findAllCourseGroupNames
            case ASSIGNMENT, TEST -> courseGroupsService.findAllCourseGroupNames(course.getId());
            case PROJECT -> {
                accessAuthorizer.authorizeCourseAccess(course);
                if (userService.getCurrentUserRole() == UserType.COORDINATOR) {
                    yield List.of("assigned");
                } else {
                    yield List.of();
                }
            }
        };
    }
}
