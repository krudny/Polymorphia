package com.agh.polymorphia_backend.model.course.reward.item;


import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "flat_bonus_items")
@PrimaryKeyJoinColumn(name = "item_id")
@Data
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class FlatBonusItem extends Item {
    private Integer xpBonus;

    @Enumerated(EnumType.STRING)
    private FlatBonusItemBehavior behavior;
}
