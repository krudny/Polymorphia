package com.agh.polymorphia_backend.dto.response.event.section.grade;

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
