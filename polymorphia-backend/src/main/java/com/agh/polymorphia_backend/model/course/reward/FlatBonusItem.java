package com.agh.polymorphia_backend.model.course.reward;


import com.agh.polymorphia_backend.model.course.reward.item.FlatBonusItemBehavior;
import com.agh.polymorphia_backend.model.course.reward.item.ItemType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@Entity
@Table(name = "flat_bonus_items")
@PrimaryKeyJoinColumn(name = "item_id")
@Data
@SuperBuilder
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
@NoArgsConstructor
public class FlatBonusItem extends Item {
    @NotNull
    @PositiveOrZero
    @Column(precision = 4, scale = 1)
    private BigDecimal xpBonus;

    @NotNull
    @Enumerated(EnumType.STRING)
    private FlatBonusItemBehavior behavior;

    @Override
    public ItemType getItemType() {
        return ItemType.FLAT_BONUS;
    }
}
