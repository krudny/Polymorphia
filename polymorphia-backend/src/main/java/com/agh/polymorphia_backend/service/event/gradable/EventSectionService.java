package com.agh.polymorphia_backend.service.event.gradable;

import com.agh.polymorphia_backend.dto.response.event.gradable.GradableEventResponseDto;
import com.agh.polymorphia_backend.dto.response.event.gradable.GradableEventShortResponseDto;
import com.agh.polymorphia_backend.dto.response.event.section.EventSectionResponseDto;
import com.agh.polymorphia_backend.dto.response.event.section.bonus.FlatBonusDto;
import com.agh.polymorphia_backend.dto.response.event.section.bonus.PercentageBonusDto;
import com.agh.polymorphia_backend.exception.database.InvalidArgumentException;
import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.model.event.gradable.GradableEvent;
import com.agh.polymorphia_backend.model.event.section.EventSection;
import com.agh.polymorphia_backend.model.grade.Grade;
import com.agh.polymorphia_backend.model.grade.reward.AssignedChest;
import com.agh.polymorphia_backend.model.grade.reward.AssignedItem;
import com.agh.polymorphia_backend.repository.event.gradable.GradableEventRepository;
import com.agh.polymorphia_backend.repository.event.section.EventSectionRepository;
import com.agh.polymorphia_backend.service.GradeService;
import com.agh.polymorphia_backend.service.course.AnimalService;
import com.agh.polymorphia_backend.service.mapper.gradable.GradableEventMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Set;

import static com.agh.polymorphia_backend.service.DbExtractingUtil.*;

@Service
@AllArgsConstructor
public abstract class EventSectionService {

    protected final GradableEventMapper mapper;
    protected final AnimalService animalService;
    private final EventSectionRepository eventSectionRepository;
    private final GradableEventRepository gradableEventRepository;
    private final XpCalculator xpCalculator;
    private final GradeService gradeService;

    protected EventSectionService(
            GradableEventMapper mapper,
            GradeService gradeService,
            AnimalService animalService,
            EventSectionRepository eventSectionRepository,
            XpCalculator xpCalculator,
            GradableEventRepository gradableEventRepository
    ) {
        this.mapper = mapper;
        this.gradeService = gradeService;
        this.animalService = animalService;
        this.eventSectionRepository = eventSectionRepository;
        this.gradableEventRepository = gradableEventRepository;
        this.xpCalculator = xpCalculator;
    }

    public abstract EventSectionResponseDto getAllEvents(Long eventSectionId);

    public GradableEventResponseDto getOneEvent(Long eventId) {
        GradableEvent<?> gradableEvent = gradableEventRepository.findById(eventId)
                .orElseThrow(() -> new InvalidArgumentException(
                        String.format(DB_OBJECT_NOT_FOUND, FIELD_GRADABLE_EVENT, eventId)));
        Animal animal = animalService.getAnimal(gradableEvent.getEventSection());

        return mapper.toGradableEventResponseDto(gradableEvent, animal);
    }

    protected void addGradableEventsSummary(
            EventSectionResponseDto responseDto,
            Long sectionId) {

        EventSection section = getEventSection(sectionId);
        responseDto.setName(section.getName());

        Animal animal = animalService.getAnimal(section);
        Set<GradableEvent<?>> gradableEvents = section.getGradableEvents();

        List<Grade> grades = gradeService.getGradableEventGrades(gradableEvents, animal);

        setSummaryGrade(responseDto, grades, animal.getId(), section);

    }

    private void setSummaryGrade(EventSectionResponseDto eventSectionResponseDto,
                                 List<Grade> eventSectionGrades,
                                 Long animalId,
                                 EventSection eventSection) {
        Set<Grade> allAnimalGrades = gradeService.getAnimalGrades(animalId);
        List<AssignedItem> animalAssignedItems = getAssignedItems(allAnimalGrades, eventSection);

        int percentageBonus = xpCalculator.sumPercentageBonus(animalAssignedItems);
        BigDecimal flatBonusXp = xpCalculator.sumFlatBonus(animalAssignedItems);
        BigDecimal gainedXp = xpCalculator.sumGainedXp(eventSectionGrades);

        BigDecimal percentageBonusXp = gainedXp.add(flatBonusXp).multiply(BigDecimal.valueOf(percentageBonus))
                .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP)
                .setScale(1, RoundingMode.HALF_UP);

        PercentageBonusDto percentageBonusDto = PercentageBonusDto.builder()
                .xp(percentageBonusXp)
                .percentage(percentageBonus)
                .items(xpCalculator.getPercentageBonusItemDtos(animalAssignedItems, gainedXp))
                .build();

        FlatBonusDto flatBonusItemDto = FlatBonusDto.builder()
                .xp(flatBonusXp)
                .items(xpCalculator.getFlatBonusItemDtos(animalAssignedItems))
                .build();

        eventSectionResponseDto.setGainedXp(gainedXp);
        eventSectionResponseDto.setFlatBonus(flatBonusItemDto);
        eventSectionResponseDto.setPercentageBonus(percentageBonusDto);
        eventSectionResponseDto.setTotalXp(gainedXp.add(flatBonusXp).add(percentageBonusXp));
    }

    public EventSection getEventSection(Long id) {
        return eventSectionRepository.findById(id)
                .orElseThrow(() -> new InvalidArgumentException(
                        String.format(DB_OBJECT_NOT_FOUND,
                                FIELD_EVENT_SECTION,
                                id)
                ));
    }

    public List<AssignedItem> getAssignedItems(Set<Grade> grades, EventSection eventSection) {
        return grades.stream()
                .map(Grade::getAssignedChests)
                .flatMap(Set::stream)
                .filter(AssignedChest::getOpened)
                .map(AssignedChest::getAssignedItems)
                .flatMap(List::stream)
                .filter(AssignedItem::getUsed)
                .filter(assignedItem -> assignedItem.getItem().getEventSection().equals(eventSection))
                .toList();

    }

    public List<GradableEventShortResponseDto> getShortGradableEvents(Long eventSectionId) {
        EventSection eventSection = getEventSection(eventSectionId);

        Animal animal = animalService.getAnimal(eventSection);
        Set<GradableEvent<?>> gradableEventSet = eventSection.getGradableEvents();

        return gradableEventSet.stream()
                .map(event -> mapper.toShortResponseDto(event, animal))
                .toList();
    }
}
