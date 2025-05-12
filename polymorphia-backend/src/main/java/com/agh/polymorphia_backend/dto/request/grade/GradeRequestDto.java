package com.agh.polymorphia_backend.dto.request.grade;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record GradeRequestDto(
        @NotNull
        Long instructorId,

        @NotNull
        Long studentId,

        @NotNull
        Long courseGroupId,

        @NotNull
        Long gradableEventId,

        @NotNull
        Integer xp

) {

}
