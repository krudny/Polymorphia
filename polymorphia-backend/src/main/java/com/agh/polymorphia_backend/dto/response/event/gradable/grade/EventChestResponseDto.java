package com.agh.polymorphia_backend.dto.response.event.gradable.grade;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.time.ZonedDateTime;

@Builder
public record EventChestResponseDto(
        @NotNull
        Long id,

        @NotNull
        Long assignedChestId,

        @NotEmpty
        String name,

        @NotEmpty
        String imageUrl,

        @NotNull
        Boolean opened,

        @NotNull
        @JsonFormat(pattern="dd.MM.yyyy")
        ZonedDateTime receivedDate
) {
}
