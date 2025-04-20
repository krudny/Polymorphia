package com.agh.polymorphia_backend.model.course.reward.item;

import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "percentage_bonus_items")
@PrimaryKeyJoinColumn(name = "item_id")

@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@NoArgsConstructor
public class PercentageBonusItem extends Item {
    private Integer percentageBonus;
}
