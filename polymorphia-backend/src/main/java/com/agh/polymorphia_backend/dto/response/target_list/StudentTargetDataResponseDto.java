package com.agh.polymorphia_backend.dto.response.target_list;

import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record StudentTargetDataResponseDto(
        Long id,
        String fullName,
        String animalName,
        String evolutionStage,
        String group,
        String imageUrl,
        BigDecimal gainedXp
) {
}