package com.agh.polymorphia_backend.dto.response.event.section;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@SuperBuilder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class EventSectionResponseDto {
    @NotEmpty
    private String name;

    @NotNull
    private List<GradableEventResponseDto> gradableEvents;

    @NotNull
    private Integer gainedXp;

    @NotNull
    private Integer flatBonusXp;

    @NotNull
    private Integer percentageBonus;

    @NotNull
    private Float percentageBonusXp;

    @NotNull
    private Float totalXp;
}
