package com.agh.polymorphia_backend.dto.response.reward.item;

import com.agh.polymorphia_backend.model.reward.item.ItemType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Builder;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
public class PercentageBonusItemResponseDtoBase extends ItemResponseDtoBase {
    @NotNull
    @Builder.Default
    private ItemType itemBonusType = ItemType.PERCENTAGE_BONUS;

    @NotNull
    @PositiveOrZero
    private Integer percentage;
}
