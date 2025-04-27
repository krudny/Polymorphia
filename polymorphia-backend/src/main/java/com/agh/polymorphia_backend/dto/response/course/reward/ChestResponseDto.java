package com.agh.polymorphia_backend.dto.response.course.reward;

import com.agh.polymorphia_backend.model.course.reward.ChestBehavior;
import lombok.Builder;

@Builder
public record ChestResponseDto(
        Long id,
        String name,
        String description,
        String imageUrl,
        ChestBehavior behavior,
        Long courseId
) {
}
