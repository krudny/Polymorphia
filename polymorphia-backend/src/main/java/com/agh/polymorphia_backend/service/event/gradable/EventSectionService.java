package com.agh.polymorphia_backend.service.event.gradable;

import com.agh.polymorphia_backend.dto.response.event.section.EventSectionResponseDto;
import com.agh.polymorphia_backend.dto.response.event.section.GradableEventResponseDto;
import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.model.event.gradable.GradableEvent;
import com.agh.polymorphia_backend.model.event.section.EventSection;
import com.agh.polymorphia_backend.model.grade.Grade;
import com.agh.polymorphia_backend.model.grade.reward.AssignedItem;
import com.agh.polymorphia_backend.service.GradeService;
import com.agh.polymorphia_backend.service.course.AnimalService;
import com.agh.polymorphia_backend.service.mapper.gradable.GradableEventMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public abstract class EventSectionService<T extends GradableEventMapper> {

    protected final T mapper;
    protected final AnimalService animalService;
    protected final com.agh.polymorphia_backend.service.event.section.EventSectionService eventSectionService;
    private final XpCalculator xpCalculator;
    private final GradeService gradeService;

    protected EventSectionService(
            T mapper,
            GradeService gradeService,
            AnimalService animalService,
            com.agh.polymorphia_backend.service.event.section.EventSectionService eventSectionService,
            XpCalculator xpCalculator
    ) {
        this.mapper = mapper;
        this.gradeService = gradeService;
        this.animalService = animalService;
        this.eventSectionService = eventSectionService;
        this.xpCalculator = xpCalculator;
    }

    public abstract EventSectionResponseDto getAllEvents(Long eventSectionId);

    protected <S extends EventSection, E extends GradableEvent<S>> EventSectionResponseDto getAllGradableEvents(
            EventSectionResponseDto responseDto,
            Long sectionId,
            Class<S> eventSectionClass,
            Function<S, Set<E>> getGradableEventsFunction,
            BiFunction<E, Animal, GradableEventResponseDto> mapperFunction) {

        S section = eventSectionService.getEventSection(sectionId, eventSectionClass);
        responseDto.setName(section.getName());

        Animal animal = animalService.getAnimal(section);
        Set<E> gradableEventsSet = getGradableEventsFunction.apply(section);

        Map<Long, GradableEventResponseDto> gradableEvents = gradableEventsSet.stream()
                .map(event -> mapperFunction.apply(event, animal))
                .collect(Collectors.toMap(GradableEventResponseDto::getId, dto -> dto));

        List<Grade> grades = gradeService.getGradableEventGrades(gradableEventsSet, animal);

        setSummaryGrade(responseDto, gradableEvents, grades, animal.getId(), section);
        responseDto.setGradableEvents(new ArrayList<>(gradableEvents.values()));

        return responseDto;
    }


    private void setSummaryGrade(EventSectionResponseDto eventSectionResponseDto,
                                 Map<Long, GradableEventResponseDto> gradableEvents,
                                 List<Grade> eventSectionGrades,
                                 Long animalId,
                                 EventSection eventSection) {
        Set<Grade> allAnimalGrades = gradeService.getAnimalGrades(animalId);
        List<AssignedItem> animalAssignedItems = eventSectionService.getAssignedItems(allAnimalGrades, eventSection);

        int percentageBonus = xpCalculator.setGradableEventBonusXpAndReturnPercentageBonusSum(animalAssignedItems, gradableEvents);
        int flatBonusXp = xpCalculator.sumFlatBonusXp(gradableEvents);
        int gainedXp = xpCalculator.sumGainedXp(eventSectionGrades);

        float percentageBonusXp = (float) ((gainedXp + flatBonusXp) * percentageBonus) / 100;

        eventSectionResponseDto.setGainedXp(gainedXp);
        eventSectionResponseDto.setFlatBonusXp(flatBonusXp);
        eventSectionResponseDto.setPercentageBonus(percentageBonus);
        eventSectionResponseDto.setPercentageBonusXp(percentageBonusXp);
        eventSectionResponseDto.setTotalXp(gainedXp + flatBonusXp + percentageBonusXp);
    }
}
