package com.agh.polymorphia_backend.dto.response.course;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record EvolutionStageResponseDto(
        @NotNull
        Long id,

        @NotEmpty
        String name,

        @NotEmpty
        String description,

        @NotNull
        Integer minXp,

        @NotNull
        BigDecimal grade,

        @NotEmpty
        String imageUrl,

        @NotEmpty
        String gradingText,

        @NotNull
        Long courseId
) {
}
