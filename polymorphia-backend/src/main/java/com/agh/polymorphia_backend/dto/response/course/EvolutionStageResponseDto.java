package com.agh.polymorphia_backend.dto.response.course;

import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record EvolutionStageResponseDto(
        long id,
        String name,
        String description,
        int minXp,
        BigDecimal grade,
        String imageUrl,
        String imageWithoutBgUrl,
        long courseId
) {
}
