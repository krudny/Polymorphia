package com.agh.polymorphia_backend.service.event;

import com.agh.polymorphia_backend.dto.response.course.reward.item.assigned.AssignedItemResponseDto;
import com.agh.polymorphia_backend.dto.response.event.section.EventSectionResponseDto;
import com.agh.polymorphia_backend.dto.response.grade.PointsSummaryBonusResponseDto;
import com.agh.polymorphia_backend.dto.response.grade.PointsSummaryResponseDto;
import com.agh.polymorphia_backend.exception.database.InvalidArgumentException;
import com.agh.polymorphia_backend.exception.database.UnknownSubclassException;
import com.agh.polymorphia_backend.model.course.reward.item.ItemType;
import com.agh.polymorphia_backend.model.event.gradable.GradableEvent;
import com.agh.polymorphia_backend.model.event.section.EventSection;
import com.agh.polymorphia_backend.repository.event.EventSectionRepository;
import com.agh.polymorphia_backend.service.DbExtractingUtil;
import com.agh.polymorphia_backend.service.grade.GradeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class EventSectionService {
    private static final String EVENT_SECTION_NOT_FOUND = "Event section not found";

    private final EventSectionRepository eventSectionRepository;
    private final GradableEventService gradableEventService;
    private final GradeService gradeService;


    public List<EventSectionResponseDto> getEventSections(Long courseId) {
        List<EventSection> sections;
        try {
            sections = eventSectionRepository.findByCourseId(courseId);
        } catch (NullPointerException ex) {
            throw new UnknownSubclassException(
                    String.format(DbExtractingUtil.UNKNOWN_SUBCLASS,
                            DbExtractingUtil.FIELD_EVENT_SECTION)
            );
        }

        return sections.stream()
                .map(this::eventSectionToResponseDto)
                .sorted(Comparator.comparing(EventSectionResponseDto::getOrderIndex))
                .toList();
    }

    public EventSectionResponseDto getEventSection(Long eventSectionId) {
        EventSection section = eventSectionRepository.findById(eventSectionId)
                .orElseThrow(() -> new InvalidArgumentException(EVENT_SECTION_NOT_FOUND));

        return eventSectionToResponseDto(section);
    }


    public PointsSummaryResponseDto getPointsSummary(Long eventSectionId) {
        Set<GradableEvent> gradableEvents = gradableEventService.getGradableEvents(eventSectionId);
        BigDecimal gainedXp = gradeService.getGradableEventsSumXp(gradableEvents);

        List<AssignedItemResponseDto> flatBonusAssignedItems = gradeService.getAssignedItemDtos(eventSectionId, gainedXp, ItemType.FLAT_BONUS);
        List<AssignedItemResponseDto> percentageBonusAssignedItems = gradeService.getAssignedItemDtos(eventSectionId, gainedXp, ItemType.PERCENTAGE_BONUS);

        PointsSummaryBonusResponseDto flatBonus = getPointsSummaryBonusResponseDto(flatBonusAssignedItems);
        PointsSummaryBonusResponseDto percentageBonus = getPointsSummaryBonusResponseDto(percentageBonusAssignedItems);
        percentageBonus.setPercentage(gradeService.getTotalPercentage(percentageBonusAssignedItems));

        return PointsSummaryResponseDto.builder()
                .gainedXp(gainedXp)
                .flatBonus(flatBonus)
                .percentageBonus(percentageBonus)
                .totalXp(gainedXp.add(percentageBonus.getXp().add(flatBonus.getXp())))
                .build();
    }

    private PointsSummaryBonusResponseDto getPointsSummaryBonusResponseDto(List<AssignedItemResponseDto> bonusAssignedItems) {
        return PointsSummaryBonusResponseDto.builder()
                .xp(gradeService.getTotalBonusPoints(bonusAssignedItems))
                .assignedItems(bonusAssignedItems)
                .build();
    }

    private EventSectionResponseDto eventSectionToResponseDto(EventSection eventSection) {
        return EventSectionResponseDto.builder()
                .id(eventSection.getId())
                .name(eventSection.getName())
                .orderIndex(eventSection.getOrderIndex())
                .type(eventSection.getEventSectionType())
                .build();
    }
}
