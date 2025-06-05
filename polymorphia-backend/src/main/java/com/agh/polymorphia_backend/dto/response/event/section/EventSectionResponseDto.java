package com.agh.polymorphia_backend.dto.response.event.section;

import com.agh.polymorphia_backend.dto.response.event.section.bonus.FlatBonusDto;
import com.agh.polymorphia_backend.dto.response.event.section.bonus.PercentageBonusDto;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@SuperBuilder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class EventSectionResponseDto {
    @NotEmpty
    private String name;

    @NotNull
    @Positive
    @Digits(integer = 3, fraction = 1)
    private BigDecimal gainedXp;

    @NotNull
    private PercentageBonusDto percentageBonus;

    @NotNull
    private FlatBonusDto flatBonus;

    @NotNull
    @Positive
    @Digits(integer = 3, fraction = 1)
    private BigDecimal totalXp;
}
