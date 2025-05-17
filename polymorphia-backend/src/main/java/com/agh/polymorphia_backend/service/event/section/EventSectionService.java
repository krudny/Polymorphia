package com.agh.polymorphia_backend.service.event.section;

import com.agh.polymorphia_backend.exception.database.InvalidArgumentException;
import com.agh.polymorphia_backend.model.event.section.EventSection;
import com.agh.polymorphia_backend.model.grade.Grade;
import com.agh.polymorphia_backend.model.grade.reward.AssignedChest;
import com.agh.polymorphia_backend.model.grade.reward.AssignedItem;
import com.agh.polymorphia_backend.repository.event.section.EventSectionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

import static com.agh.polymorphia_backend.service.DbExtractingUtil.DB_OBJECT_NOT_FOUND;
import static com.agh.polymorphia_backend.service.DbExtractingUtil.FIELD_EVENT_SECTION;

@Service
@AllArgsConstructor
public class EventSectionService {
    private final EventSectionRepository eventSectionRepository;

    public <T extends EventSection> T getEventSection(Long id, Class<T> eventSectionClass) {
        return eventSectionRepository.findById(id)
                .filter(eventSectionClass::isInstance)
                .map(eventSection -> (T) eventSection)
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
}
