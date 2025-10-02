package com.agh.polymorphia_backend.dto.response.event;

import com.agh.polymorphia_backend.model.event_section.EventSectionType;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record EventSectionResponseDto(
        @NotNull Long id,
        @NotNull EventSectionType type,
        @NotNull String name,
        @NotNull Long orderIndex
) {
}
