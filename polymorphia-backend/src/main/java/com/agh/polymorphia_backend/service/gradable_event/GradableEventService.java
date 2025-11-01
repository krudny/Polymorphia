package com.agh.polymorphia_backend.service.gradable_event;

import com.agh.polymorphia_backend.dto.response.event.BaseGradableEventResponseDto;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.event_section.EventSection;
import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import com.agh.polymorphia_backend.model.user.AbstractRoleUser;
import com.agh.polymorphia_backend.model.user.UserType;
import com.agh.polymorphia_backend.repository.course.GradableEventRepository;
import com.agh.polymorphia_backend.service.event_section.EventSectionService;
import com.agh.polymorphia_backend.service.mapper.GradableEventMapper;
import com.agh.polymorphia_backend.service.student.AnimalService;
import com.agh.polymorphia_backend.service.user.UserService;
import com.agh.polymorphia_backend.service.validation.AccessAuthorizer;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Service
@AllArgsConstructor
public class GradableEventService {
    private final GradableEventRepository gradableEventRepository;
    private final AccessAuthorizer accessAuthorizer;
    private final EventSectionService eventSectionService;
    private final UserService userService;
    private final GradableEventMapper gradableEventMapper;
    private final AnimalService animalService;

    public GradableEvent getGradableEventById(Long gradableEventId) {
        return gradableEventRepository
                .findById(gradableEventId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Gradable event not found"));
    }

    public List<BaseGradableEventResponseDto> getGradableEvents(Long eventSectionId) {
        EventSection eventSection = eventSectionService.getEventSection(eventSectionId);

        Course course = eventSection.getCourse();
        accessAuthorizer.authorizeCourseAccess(course);

        UserType userRole = userService.getUserRoleInCourse(course.getId());

        Function<GradableEvent, BaseGradableEventResponseDto> mapper = getMapperFunction(userRole, eventSection, course.getId());

        return eventSection.getGradableEvents().stream()
                .map(mapper)
                .sorted(Comparator.comparing(BaseGradableEventResponseDto::getOrderIndex))
                .toList();
    }

    private Function<GradableEvent, BaseGradableEventResponseDto> getMapperFunction(UserType userRole, EventSection eventSection, Long courseId) {
        return switch (userRole) {
            case STUDENT -> gradableEvent -> {
                Long userId = userService.getCurrentUser().getUserId();
                Long animalId = animalService.getAnimal(userId, courseId).getId();
                Optional<BigDecimal> gainedXp = getGainedXp(gradableEvent, animalId);
                boolean hasReward = hasReward(gradableEvent);

                return gradableEventMapper.toStudentGradableEventResponseDto(
                        gradableEvent,
                        eventSection.getEventSectionType(),
                        gainedXp,
                        hasReward
                );
            };
            case INSTRUCTOR, COORDINATOR -> gradableEvent -> {
                Long ungradedStudents = getUngradedStudents(gradableEvent);

                return gradableEventMapper.toInstructorGradableEventResponseDto(
                        gradableEvent,
                        eventSection.getEventSectionType(),
                        ungradedStudents
                );
            };
            case UNDEFINED -> throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        };
    }

    public boolean hasReward(GradableEvent gradableEvent) {
        return gradableEventRepository.rewardExists(gradableEvent);
    }

    public Optional<BigDecimal> getGainedXp(GradableEvent gradableEvent, Long animalId) {
        return gradableEventRepository.sumGainedXp(gradableEvent, animalId);
    }

    public Long getUngradedStudents(GradableEvent gradableEvent) {
        AbstractRoleUser user = userService.getCurrentUser();
        return gradableEventRepository.countUngradedAnimalsForInstructorAndEvent(user.getUserId(), gradableEvent.getId());
    }
}