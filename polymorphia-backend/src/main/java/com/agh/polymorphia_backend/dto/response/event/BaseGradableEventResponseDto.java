package com.agh.polymorphia_backend.dto.response.event;

import com.agh.polymorphia_backend.model.event_section.EventSectionType;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BaseGradableEventResponseDto {
    @NotNull
    private Long id;

    @NotNull
    private String name;

    private String topic;

    @NotNull
    private Long orderIndex;

    private Long roadMapOrderIndex;

    private Boolean isLocked;
}
