package com.agh.polymorphia_backend.dto.response.reward.item;

import com.agh.polymorphia_backend.model.course.reward.item.FlatBonusItemBehavior;
import com.agh.polymorphia_backend.model.course.reward.item.ItemType;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@SuperBuilder
public class FlatBonusItemResponseDto extends ItemResponseDto {
    @NotNull
    private ItemType itemBonusType = ItemType.FLAT_BONUS;

    @NotNull
    @PositiveOrZero
    @Digits(integer = 3, fraction = 1)
    private BigDecimal xp;

    @NotNull
    private FlatBonusItemBehavior behavior;
}
