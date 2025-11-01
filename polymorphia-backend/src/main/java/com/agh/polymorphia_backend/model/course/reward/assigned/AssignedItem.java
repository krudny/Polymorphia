package com.agh.polymorphia_backend.model.course.reward.assigned;

import com.agh.polymorphia_backend.model.course.reward.RewardType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@Entity
@Table(name = "assigned_items")
@PrimaryKeyJoinColumn(name = "assigned_reward_id")
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@EqualsAndHashCode(onlyExplicitlyIncluded = true, callSuper = true)
public class AssignedItem extends AssignedReward {
    @NotNull
    @Column(
            nullable = false,
            columnDefinition = "NUMERIC(4,1) DEFAULT 0"
    )
    private BigDecimal bonusXp;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_chest_id")
    @ToString.Exclude
    @JsonIgnore
    private AssignedChest assignedChest;

    @Override
    public RewardType getType() {
        return RewardType.ITEM;
    }
}
