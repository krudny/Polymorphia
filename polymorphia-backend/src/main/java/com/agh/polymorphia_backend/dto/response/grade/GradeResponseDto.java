package com.agh.polymorphia_backend.dto.response.grade;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.List;

@Builder
public record GradeResponseDto(
        @NotNull
        Long id,

        @NotNull
        Integer xp,

        @NotNull
        List<AssignedChestResponseDto> assignedChests
) {

}
