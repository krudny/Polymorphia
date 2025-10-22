package com.agh.polymorphia_backend.dto.response.profile;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@SuperBuilder
@Getter
public class EvolutionStageThresholdResponseDto {
    @NotNull
    private Long id;

    @NotEmpty
    private String name;

    @NotNull
    @PositiveOrZero
    @Digits(integer = 3, fraction = 1)
    private BigDecimal minXp;

    @NotNull
    @PositiveOrZero
    @Digits(integer = 3, fraction = 1)
    private BigDecimal grade;


}
