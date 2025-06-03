package com.agh.polymorphia_backend.dto.response.event.gradable.grade;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record EventChestResponseDto(
        @NotNull
        Long id,

        @NotEmpty
        String name,

        @NotEmpty
        String imageUrl,

        @NotNull
        Boolean opened
) {
}
