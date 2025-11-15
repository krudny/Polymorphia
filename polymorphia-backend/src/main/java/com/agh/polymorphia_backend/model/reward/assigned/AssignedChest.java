package com.agh.polymorphia_backend.model.reward.assigned;

import com.agh.polymorphia_backend.model.reward.RewardType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Entity
@Table(name = "assigned_chests")
@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true, callSuper = true)
@PrimaryKeyJoinColumn(name = "assigned_reward_id")
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class AssignedChest extends AssignedReward {

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "assignedChest")
    @ToString.Exclude
    @JsonIgnore
    private List<AssignedItem> assignedItems;

    @Override
    public RewardType getType() {
        return RewardType.CHEST;
    }
}
