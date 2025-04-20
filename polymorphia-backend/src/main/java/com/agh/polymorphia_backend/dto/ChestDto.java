package com.agh.polymorphia_backend.dto;

import com.agh.polymorphia_backend.model.course.reward.ChestBehavior;
import lombok.Builder;

@Builder
public record ChestDto(
        Long id,
        String name,
        String description,
        String imageUrl,
        ChestBehavior behavior,
        Long courseId
) {
}
