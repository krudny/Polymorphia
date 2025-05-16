package com.agh.polymorphia_backend.service.gradable;

import com.agh.polymorphia_backend.dto.response.page.event.AllGradableEventsResponseDto;
import com.agh.polymorphia_backend.dto.response.page.event.GradableEventResponseDto;
import com.agh.polymorphia_backend.exception.database.InvalidArgumentException;
import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.model.course.reward.item.FlatBonusItem;
import com.agh.polymorphia_backend.model.course.reward.item.Item;
import com.agh.polymorphia_backend.model.course.reward.item.PercentageBonusItem;
import com.agh.polymorphia_backend.model.event.gradable.GradableEvent;
import com.agh.polymorphia_backend.model.event.section.CourseworkSection;
import com.agh.polymorphia_backend.model.event.section.EventSection;
import com.agh.polymorphia_backend.model.event.section.TestSection;
import com.agh.polymorphia_backend.model.grade.Grade;
import com.agh.polymorphia_backend.model.grade.reward.AssignedChest;
import com.agh.polymorphia_backend.model.grade.reward.AssignedItem;
import com.agh.polymorphia_backend.model.user.Student;
import com.agh.polymorphia_backend.repository.course.AnimalRepository;
import com.agh.polymorphia_backend.repository.event.section.EventSectionRepository;
import com.agh.polymorphia_backend.service.GradeService;
import com.agh.polymorphia_backend.service.mapper.GradableEventMapper;
import lombok.AllArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.stream.Collectors;

import static com.agh.polymorphia_backend.service.DbExtractingUtil.DB_OBJECT_NOT_FOUND;
import static com.agh.polymorphia_backend.service.DbExtractingUtil.FIELD_EVENT_SECTION;

@Service
@AllArgsConstructor
public class GradableEventService {
    private static final String NO_ANIMAL_FOUND = "Student does not have animal in this course";
    // service
    private final GradableEventMapper gradableEventMapper;
    private final GradeService gradeService;

    // repository
    private final EventSectionRepository eventSectionRepository;
    private final AnimalRepository animalRepository;

    public AllGradableEventsResponseDto getAllCourseworks(Long courseworkSectionId) {
        return getAllGradableEvents(
                courseworkSectionId,
                CourseworkSection.class,
                CourseworkSection::getCourseworks,
                gradableEventMapper::courseworkToGradableEventResponseDto
        );
    }

    public AllGradableEventsResponseDto getAllTests(Long testSectionId) {
        return getAllGradableEvents(
                testSectionId,
                TestSection.class,
                TestSection::getTests,
                gradableEventMapper::testToGradableEventResponseDto
        );
    }


    private <S extends EventSection, E extends GradableEvent<S>> AllGradableEventsResponseDto getAllGradableEvents(
            Long sectionId,
            Class<S> eventSectionClass,
            Function<S, Set<E>> getGradableEventsFunction,
            BiFunction<E, Animal, GradableEventResponseDto> mapperFunction) {

        S section = getEventSection(sectionId, eventSectionClass);
        AllGradableEventsResponseDto responseDto = new AllGradableEventsResponseDto();
        responseDto.setName(section.getName());

        Animal animal = getAnimal(section);
        Set<E> gradableEventsSet = getGradableEventsFunction.apply(section);

        Map<Long, GradableEventResponseDto> gradableEvents = gradableEventsSet.stream()
                .map(event -> mapperFunction.apply(event, animal))
                .collect(Collectors.toMap(GradableEventResponseDto::getId, dto -> dto));

        List<Grade> grades = getGradableEventGrades(gradableEventsSet, animal);
        countXpAndRewards(responseDto, gradableEvents, grades, section);
        responseDto.setGradableEvents(new ArrayList<>(gradableEvents.values()));

        return responseDto;
    }


    private void countXpAndRewards(AllGradableEventsResponseDto responseDto,
                                   Map<Long, GradableEventResponseDto> gradableEvents,
                                   List<Grade> grades, EventSection eventSection) {

        List<AssignedItem> assignedItems = getEventSectionAssignedItems(grades, eventSection);

        int percentageBonus = setBonusXpAndReturnPercentageBonusSum(assignedItems, gradableEvents);
        int flatBonusXp = gradableEvents.values().stream()
                .map(GradableEventResponseDto::getFlatBonusXp)
                .reduce(0, Integer::sum);

        int gainedXp = grades.stream()
                .map(Grade::getXp)
                .reduce(0, Integer::sum);

        float percentageBonusXp = (float) ((gainedXp + flatBonusXp) * percentageBonus) / 100;

        responseDto.setGainedXp(gainedXp);
        responseDto.setFlatBonusXp(flatBonusXp);
        responseDto.setPercentageBonus(percentageBonus);
        responseDto.setPercentageBonusXp(percentageBonusXp);
        responseDto.setTotalXp(gainedXp + flatBonusXp + percentageBonusXp);
    }

    private int setBonusXpAndReturnPercentageBonusSum(List<AssignedItem> assignedItems, Map<Long, GradableEventResponseDto> gradableEvents) {
        Integer percentageBonus = 0;

        for (AssignedItem assignedItem : assignedItems) {
            Item item = (Item) Hibernate.unproxy(assignedItem.getItem());
            if (item instanceof PercentageBonusItem) {
                percentageBonus += ((PercentageBonusItem) item).getPercentageBonus();
            } else {
                int xpBonus = ((FlatBonusItem) item).getXpBonus();

                for (GradableEvent<?> boostedGradableEvent : assignedItem.getBoostedGradableEvents()) {
                    GradableEventResponseDto event = gradableEvents.get(boostedGradableEvent.getId());
                    if (event != null) {
                        xpBonus = setBonusXp(event, xpBonus);
                    }
                }
            }
        }
        return percentageBonus;
    }

    private List<AssignedItem> getEventSectionAssignedItems(List<Grade> grades, EventSection eventSection) {
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

    private int setBonusXp(GradableEventResponseDto event, int xpBonus) {
        int lostXp = event.getMaxXp() - event.getGainedXp();
        int eventXpBonus = Math.min(lostXp, xpBonus);

        event.setFlatBonusXp(eventXpBonus + event.getFlatBonusXp());
        event.setTotalXp(event.getFlatBonusXp() + event.getGainedXp());
        return xpBonus - eventXpBonus;
    }

    private Animal getAnimal(EventSection eventSection) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Student student = (Student) authentication.getPrincipal();
        return animalRepository.findByCourseIdAndStudentId(eventSection.getCourse().getId(),
                student.getId()).orElseThrow(() -> new InvalidArgumentException(NO_ANIMAL_FOUND));
    }

    private <T extends EventSection> T getEventSection(Long id, Class<T> eventSectionClass) {
        return eventSectionRepository.findById(id)
                .filter(eventSectionClass::isInstance)
                .map(eventSection -> (T) eventSection)
                .orElseThrow(() -> new InvalidArgumentException(
                        String.format(DB_OBJECT_NOT_FOUND,
                                FIELD_EVENT_SECTION,
                                id)
                ));
    }

    private <T extends GradableEvent<?>> List<Grade> getGradableEventGrades(Set<T> gradableEvents, Animal animal) {
        return gradableEvents.stream()
                .map(coursework -> gradeService.getExistingGrade(coursework, animal)
                        .orElse(null))
                .filter(grade -> grade != null)
                .toList();
    }

}
