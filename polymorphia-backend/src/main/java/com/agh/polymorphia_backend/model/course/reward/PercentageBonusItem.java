package com.agh.polymorphia_backend.model.course.reward;

import com.agh.polymorphia_backend.model.course.reward.item.ItemType;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "percentage_bonus_items")
@PrimaryKeyJoinColumn(name = "item_id")

@Data
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
@SuperBuilder
@NoArgsConstructor
public class PercentageBonusItem extends Item {
    @NotNull
    private Integer percentageBonus;

    @Override
    public ItemType getItemType() {
        return ItemType.PERCENTAGE_BONUS;
    }
}
