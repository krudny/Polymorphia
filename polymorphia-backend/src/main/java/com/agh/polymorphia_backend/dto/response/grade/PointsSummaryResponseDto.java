package com.agh.polymorphia_backend.dto.response.grade;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Builder
@Data
public class PointsSummaryResponseDto {
    @NotNull
    @PositiveOrZero
    @Digits(integer = 3, fraction = 1)
    private BigDecimal gainedXp;

    @NotNull
    private PointsSummaryBonusResponseDto flatBonus;

    @NotNull
    private PointsSummaryBonusResponseDto percentageBonus;

    @NotNull
    @PositiveOrZero
    @Digits(integer = 3, fraction = 1)
    private BigDecimal totalXp;
}
