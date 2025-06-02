package com.agh.polymorphia_backend.dto.response.event.section;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class EventSectionResponseDto {
    @NotEmpty
    private String name;

    @NotNull
    private Float gainedXp;

    @NotNull
    private Float flatBonusXp;

    @NotNull
    private Integer percentageBonus;

    @NotNull
    private Float percentageBonusXp;

    @NotNull
    private Float totalXp;
}
