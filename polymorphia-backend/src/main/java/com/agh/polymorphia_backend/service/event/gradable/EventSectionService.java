package com.agh.polymorphia_backend.service.event.gradable;

import com.agh.polymorphia_backend.dto.response.event.section.CourseworkTestSectionResponseDto;
import com.agh.polymorphia_backend.dto.response.event.section.EventSectionResponseDto;
import com.agh.polymorphia_backend.dto.response.event.section.GradableEventResponseDto;
import com.agh.polymorphia_backend.dto.response.event.section.GradableEventShortResponseDto;
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

    protected EventSectionResponseDto getAllGradableEvents(
            EventSectionResponseDto responseDto,
            Long sectionId) {

        EventSection section = getEventSection(sectionId);
        responseDto.setName(section.getName());

        Animal animal = animalService.getAnimal(section);
        Set<GradableEvent<?>> gradableEvents = section.getGradableEvents();

        List<Grade> grades = gradeService.getGradableEventGrades(gradableEvents, animal);

        setSummaryGrade(responseDto, grades, animal.getId(), section);

        return responseDto;
    }

    private void setSummaryGrade(EventSectionResponseDto eventSectionResponseDto,
                                 List<Grade> eventSectionGrades,
                                 Long animalId,
                                 EventSection eventSection) {
        Set<Grade> allAnimalGrades = gradeService.getAnimalGrades(animalId);
        List<AssignedItem> animalAssignedItems = getAssignedItems(allAnimalGrades, eventSection);

        int percentageBonus = xpCalculator.sumPercentageBonus(animalAssignedItems);
        float flatBonusXp = xpCalculator.sumFlatBonus(animalAssignedItems);
        float gainedXp = xpCalculator.sumGainedXp(eventSectionGrades);

        float percentageBonusXp = ((gainedXp + flatBonusXp) * percentageBonus) / 100;

        eventSectionResponseDto.setGainedXp(gainedXp);
        eventSectionResponseDto.setFlatBonusXp(flatBonusXp);
        eventSectionResponseDto.setPercentageBonus(percentageBonus);
        eventSectionResponseDto.setPercentageBonusXp(percentageBonusXp);
        eventSectionResponseDto.setTotalXp(gainedXp + flatBonusXp + percentageBonusXp);
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

    protected void setGradableEventsShortResponseDto(CourseworkTestSectionResponseDto responseDto, Long testSectionId) {
        EventSection eventSection = getEventSection(testSectionId);

        Animal animal = animalService.getAnimal(eventSection);
        Set<GradableEvent<?>> projectCriteriaSet = eventSection.getGradableEvents();

        List<GradableEventShortResponseDto> gradableEvents = projectCriteriaSet.stream()
                .map(event -> mapper.toShortResponseDto(event, animal))
                .toList();

        responseDto.setGradableEvents(gradableEvents);
    }
}
