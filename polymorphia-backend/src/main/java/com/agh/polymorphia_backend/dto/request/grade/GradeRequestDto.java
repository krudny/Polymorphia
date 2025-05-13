package com.agh.polymorphia_backend.dto.request.grade;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder(toBuilder = true)
public record GradeRequestDto(
        @NotNull
        Long animalId,

        @NotNull
        Long courseGroupId,

        @NotNull
        Long gradableEventId,

        @NotNull
        Integer xp
) {

}
