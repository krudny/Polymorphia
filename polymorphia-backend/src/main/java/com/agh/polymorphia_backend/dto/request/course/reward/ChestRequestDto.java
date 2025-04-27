package com.agh.polymorphia_backend.dto.request.course.reward;

import com.agh.polymorphia_backend.model.course.reward.ChestBehavior;
import lombok.Builder;

@Builder
public record ChestRequestDto(
        String name,
        String description,
        String imageUrl,
        ChestBehavior behavior,
        Long courseId
) {
}
