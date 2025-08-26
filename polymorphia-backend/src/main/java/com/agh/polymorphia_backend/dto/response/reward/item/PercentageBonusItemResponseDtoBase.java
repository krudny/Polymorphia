package com.agh.polymorphia_backend.dto.response.reward.item;

import com.agh.polymorphia_backend.model.course.reward.item.ItemType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.experimental.SuperBuilder;

@SuperBuilder
public class PercentageBonusItemResponseDtoBase extends ItemResponseDtoBase {
    @NotNull
    private ItemType itemBonusType = ItemType.PERCENTAGE_BONUS;

    @NotNull
    @PositiveOrZero
    private Integer percentage;
}
