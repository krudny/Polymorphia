package com.agh.polymorphia_backend.dto.response.course.reward;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.List;

@Builder
public record ChestResponseDto(
        @NotNull
        Long id,

        @NotEmpty
        String name,

        @NotEmpty
        String description,

        @NotEmpty
        String imageUrl,

        @NotEmpty
        String behavior,

        @NotNull
        List<Long> itemIds,

        @NotNull
        Long courseId
) {
}
