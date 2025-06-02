package com.agh.polymorphia_backend.dto.request.course;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record EvolutionStageRequestDto(
        @NotEmpty
        String name,

        @NotEmpty
        String description,

        @NotNull
        Float minXp,

        @NotNull
        BigDecimal grade,

        @NotEmpty
        String imageUrl,

        @NotNull
        Long courseId
) {
}
