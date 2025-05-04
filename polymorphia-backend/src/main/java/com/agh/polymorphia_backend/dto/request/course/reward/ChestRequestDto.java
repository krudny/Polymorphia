package com.agh.polymorphia_backend.dto.request.course.reward;

import com.agh.polymorphia_backend.model.course.reward.ChestBehavior;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record ChestRequestDto(
        @NotEmpty
        String name,

        @NotEmpty
        String description,

        @NotNull
        ChestBehavior behavior,

        @NotNull
        Long courseId
) {
}
