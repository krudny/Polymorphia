package com.agh.polymorphia_backend.service.course.strategy;

import com.agh.polymorphia_backend.dto.request.course_import.reward.FlatBonusItemDetailsRequestDto;
import com.agh.polymorphia_backend.dto.request.course_import.reward.ItemDetailsRequestDto;
import com.agh.polymorphia_backend.dto.request.course_import.reward.PercentageBonusItemDetailsRequestDto;
import com.agh.polymorphia_backend.model.reward.FlatBonusItem;
import com.agh.polymorphia_backend.model.reward.Item;
import com.agh.polymorphia_backend.model.reward.PercentageBonusItem;
import com.agh.polymorphia_backend.repository.course.CourseRepository;
import com.agh.polymorphia_backend.repository.event_section.EventSectionRepository;
import com.agh.polymorphia_backend.repository.reward.ItemRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.function.Function;

@Component
@AllArgsConstructor
public class ItemUpdateStrategy implements EntityUpdateStrategy<ItemDetailsRequestDto, Item> {

    private final ItemRepository itemRepository;
    private final CourseRepository courseRepository;
    private final EventSectionRepository eventSectionRepository;

    @Override
    public Function<ItemDetailsRequestDto, String> getKeyExtractor() {
        return ItemDetailsRequestDto::getKey;
    }

    @Override
    public Function<Item, String> getEntityKeyExtractor() {
        return Item::getKey;
    }

    @Override
    public Function<ItemDetailsRequestDto, ?> getTypeExtractor() {
        return ItemDetailsRequestDto::getType;
    }

    @Override
    public JpaRepository<Item, Long> getRepository() {
        return itemRepository;
    }

    @Override
    public List<Item> findAllByKeys(List<String> keys, Long courseId) {
        return itemRepository.findAllByKeyIn(keys, courseId);
    }

    @Override
    public Item createNewEntity(ItemDetailsRequestDto dto) {
        return switch (dto.getType()) {
            case FLAT_BONUS -> FlatBonusItem.builder()
                    .xpBonus(((FlatBonusItemDetailsRequestDto) dto).getXpBonus())
                    .behavior(((FlatBonusItemDetailsRequestDto) dto).getBehavior())
                    .build();
            case PERCENTAGE_BONUS -> PercentageBonusItem.builder()
                    .percentageBonus(((PercentageBonusItemDetailsRequestDto) dto).getPercentageBonus())
                    .build();
        };
    }

    @Override
    public Item updateEntity(Item entity, ItemDetailsRequestDto dto,
                             Map<ItemDetailsRequestDto, Long> orderIds, Long courseId) {
        Long eventSectionId = eventSectionRepository.findIdByKeyAndCourseId(dto.getEventSectionKey(), courseId);
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        entity.setKey(dto.getKey());
        entity.setOrderIndex(orderIds.get(dto));
        entity.setLimit(dto.getLimit());
        entity.setImageUrl(dto.getImageUrl());
        entity.setEventSection(eventSectionRepository.getReferenceById(eventSectionId));
        if (entity.getId() == null) {
            entity.setCourse(courseRepository.getReferenceById(courseId));
        }
        return entity;
    }
}