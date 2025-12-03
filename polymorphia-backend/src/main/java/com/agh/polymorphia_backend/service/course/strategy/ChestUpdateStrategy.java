package com.agh.polymorphia_backend.service.course.strategy;

import com.agh.polymorphia_backend.dto.request.course_import.reward.ChestDetailsRequestDto;
import com.agh.polymorphia_backend.model.reward.Chest;
import com.agh.polymorphia_backend.model.reward.Item;
import com.agh.polymorphia_backend.repository.course.CourseRepository;
import com.agh.polymorphia_backend.repository.reward.ChestRepository;
import com.agh.polymorphia_backend.repository.reward.ItemRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class ChestUpdateStrategy implements EntityUpdateStrategy<ChestDetailsRequestDto, Chest> {

    private final ChestRepository chestRepository;
    private final CourseRepository courseRepository;
    private final ItemRepository itemRepository;

    @Override
    public Function<ChestDetailsRequestDto, String> getKeyExtractor() {
        return ChestDetailsRequestDto::getKey;
    }

    @Override
    public Function<Chest, String> getEntityKeyExtractor() {
        return Chest::getKey;
    }

    @Override
    public Function<ChestDetailsRequestDto, ?> getTypeExtractor() {
        return null;
    }

    @Override
    public JpaRepository<Chest, Long> getRepository() {
        return chestRepository;
    }

    @Override
    public List<Chest> findAllByKeys(List<String> keys) {
        return chestRepository.findAllByKeyIn(keys);
    }

    @Override
    public Chest findByKey(String key) {
        return chestRepository.findByKey(key);
    }

    @Override
    public Chest createNewEntity(ChestDetailsRequestDto dto) {
        return new Chest();
    }

    @Override
    public Chest updateEntity(Chest entity, ChestDetailsRequestDto dto,
                              Map<ChestDetailsRequestDto, Long> orderIds, Long courseId) {
        List<Item> items = dto.getItemKeys().stream()
                .map(itemRepository::getIdByKey)
                .map(itemRepository::getReferenceById)
                .collect(Collectors.toList());

        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        entity.setKey(dto.getKey());
        entity.setImageUrl(dto.getImageUrl());
        entity.setOrderIndex(orderIds.get(dto));
        entity.setBehavior(dto.getBehavior());
        entity.setItems(items);

        if (entity.getId() == null) {
            entity.setCourse(courseRepository.getReferenceById(courseId));
        }
        updateChestItems(entity, items);

        return entity;
    }

    private void updateChestItems(Chest chest, List<Item> newItems) {
        if (chest.getItems() != null) {
            for (Item oldItem : chest.getItems()) {
                oldItem.getChests().remove(chest);
            }
        }

        chest.setItems(newItems);

        for (Item item : newItems) {
            if (item.getChests() == null) {
                item.setChests(new ArrayList<>());
            }
            if (!item.getChests().contains(chest)) {
                item.getChests().add(chest);
            }
        }
    }
}
