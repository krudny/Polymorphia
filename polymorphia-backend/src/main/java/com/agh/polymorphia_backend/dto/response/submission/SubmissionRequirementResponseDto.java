package com.agh.polymorphia_backend.dto.response.submission;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Builder;

@Builder
public record SubmissionRequirementResponseDto(
        @NotNull Long id,
        @NotNull String name,
        @NotNull boolean isMandatory,
        @NotNull @PositiveOrZero Long orderIndex
        ) {
}
