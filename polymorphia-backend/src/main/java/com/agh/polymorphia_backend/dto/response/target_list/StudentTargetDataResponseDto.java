package com.agh.polymorphia_backend.dto.response.target_list;

import java.math.BigDecimal;

public record StudentTargetDataResponseDto(
        String fullName,
        String animalName,
        String evolutionStage,
        String group,
        String imageUrl,
        int position,
        BigDecimal gainedXp
) { }