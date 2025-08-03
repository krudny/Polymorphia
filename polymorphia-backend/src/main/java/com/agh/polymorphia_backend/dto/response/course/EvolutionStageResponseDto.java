package com.agh.polymorphia_backend.dto.response.course;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
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
        @Positive
        @Digits(integer = 3, fraction = 1)
        BigDecimal minXp,

        @NotNull
        @Positive
        @Digits(integer = 1, fraction = 1)
        BigDecimal grade,

        @NotEmpty
        String imageUrl,

        @NotEmpty
        String gradingText,

        @NotNull
        Long courseId
) {
}
