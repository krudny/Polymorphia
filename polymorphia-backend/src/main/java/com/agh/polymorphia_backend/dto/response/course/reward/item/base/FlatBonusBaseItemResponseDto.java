package com.agh.polymorphia_backend.dto.response.course.reward.item.base;

import com.agh.polymorphia_backend.model.course.reward.item.FlatBonusItemBehavior;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@NoArgsConstructor
@SuperBuilder
@Data
@EqualsAndHashCode(callSuper = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class FlatBonusBaseItemResponseDto extends BaseItemResponseDto {
    @NotNull
    @PositiveOrZero
    @Digits(integer = 3, fraction = 1)
    private BigDecimal xp;

    @NotNull
    private FlatBonusItemBehavior behavior;
}
