package com.agh.polymorphia_backend.dto.request.course;

import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record EvolutionStageRequestDto(
        String name,
        String description,
        int minXp,
        BigDecimal grade,
        String imageUrl,
        String imageWithoutBgUrl,
        long courseId
) {
}
