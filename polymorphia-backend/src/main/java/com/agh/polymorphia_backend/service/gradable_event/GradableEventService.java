package com.agh.polymorphia_backend.service.gradable_event;

import com.agh.polymorphia_backend.dto.request.target.TargetRequestDto;
import com.agh.polymorphia_backend.dto.request.target.TargetType;
import com.agh.polymorphia_backend.dto.response.criteria.CriterionResponseDto;
import com.agh.polymorphia_backend.dto.response.event.BaseGradableEventResponseDto;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.event_section.EventSection;
import com.agh.polymorphia_backend.model.event_section.EventSectionType;
import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import com.agh.polymorphia_backend.model.user.AbstractRoleUser;
import com.agh.polymorphia_backend.model.user.UserType;
import com.agh.polymorphia_backend.repository.gradable_event.GradableEventRepository;
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

    public List<BaseGradableEventResponseDto> getGradableEvents(
            Long eventSectionId,
            Function<GradableEvent, Long> orderIndexExtractor
    ) {
        EventSection eventSection = eventSectionService.getEventSection(eventSectionId);

        Course course = eventSection.getCourse();
        accessAuthorizer.authorizeCourseAccess(course);

        UserType userRole = userService.getUserRoleInCourse(course.getId());

        Function<GradableEvent, BaseGradableEventResponseDto> mapper = getMapperFunction(userRole, eventSection, course.getId(), orderIndexExtractor);
        List<GradableEvent> gradableEvents = eventSection.getGradableEvents();

        if (userRole != UserType.INSTRUCTOR && userRole != UserType.COORDINATOR) {
            gradableEvents = gradableEvents.stream()
                    .filter(gradableEvent -> !gradableEvent.getIsHidden())
                    .toList();
        }

        return gradableEvents.stream()
                .map(mapper)
                .sorted(Comparator.comparing(BaseGradableEventResponseDto::getOrderIndex))
                .toList();
    }

    public List<CriterionResponseDto> getCriteria(Long gradableEventId) {
        GradableEvent gradableEvent = getGradableEventById(gradableEventId);
        Course course = gradableEvent.getEventSection().getCourse();
        accessAuthorizer.authorizeCourseAccess(course);

        return gradableEvent.getCriteria().stream()
                .map(criterionMapper::toCriterionResponseDto)
                .toList();
    }

    public void validateTargetGradableEventAccess(TargetRequestDto target, GradableEvent gradableEvent) {
        boolean isInvalidGradableEventForStudentGroupTarget = target.type() == TargetType.STUDENT_GROUP &&
                gradableEvent.getEventSection().getEventSectionType() != EventSectionType.PROJECT;

        if (isInvalidGradableEventForStudentGroupTarget) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Grupowy podmiot oceny jest wspierany jedynie przy projekcie.");
        }
    }


    private GradableEvent fetchGradableEvent(Long gradableEventId) {
        return gradableEventRepository
                .findById(gradableEventId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Gradable event not found"));
    }

    private Function<GradableEvent, BaseGradableEventResponseDto> getMapperFunction(UserType userRole, EventSection eventSection, Long courseId,
                                                                                    Function<GradableEvent, Long> orderIndexExtractor
    ) {
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
                        hasReward,
                        orderIndexExtractor
                );
            };
            case INSTRUCTOR, COORDINATOR -> gradableEvent -> {
                Long ungradedStudents = getUngradedStudents(gradableEvent);

                return gradableEventMapper.toInstructorGradableEventResponseDto(
                        gradableEvent,
                        eventSection.getEventSectionType(),
                        ungradedStudents,
                        orderIndexExtractor
                );
            };
            case UNDEFINED -> throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Wybierz kurs, by pobrać eventy");
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