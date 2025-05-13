package com.agh.polymorphia_backend.dto.response.grade;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record GradeResponseDto(
        @NotNull
        Integer xp
) {

}
