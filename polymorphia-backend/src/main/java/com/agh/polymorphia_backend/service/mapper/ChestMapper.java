package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.response.course.reward.ChestResponseDto;
import com.agh.polymorphia_backend.model.course.reward.Chest;
import com.agh.polymorphia_backend.model.course.reward.item.Item;
import org.springframework.stereotype.Service;

@Service
public class ChestMapper {

    public ChestResponseDto chestToChestResponseDto(Long courseId, Chest chest) {
        return ChestResponseDto.builder()
                .id(chest.getId())
                .name(chest.getName())
                .imageUrl(chest.getImageUrl())
                .courseId(courseId)
                .behavior(chest.getBehavior().getTextValue())
                .description(chest.getDescription())
                .itemIds(chest.getItems().stream().map(Item::getId).toList())
                .build();
    }
}
