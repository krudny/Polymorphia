package com.agh.polymorphia_backend.dto;

import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record EvolutionStageDto(
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
