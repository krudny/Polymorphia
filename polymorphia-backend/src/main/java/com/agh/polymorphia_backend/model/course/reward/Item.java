package com.agh.polymorphia_backend.model.course.reward;


import com.agh.polymorphia_backend.model.course.reward.item.ItemType;
import com.agh.polymorphia_backend.model.event_section.EventSection;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@SuperBuilder
@Table(name = "items")
@ToString(exclude = {"chests"})
@Inheritance(strategy = InheritanceType.JOINED)
@PrimaryKeyJoinColumn(name = "reward_id")
@EqualsAndHashCode(onlyExplicitlyIncluded = true, callSuper = false)
public abstract class Item extends Reward {
    @NotNull
    @Column(name = "\"limit\"")
    private Integer limit;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_section_id")
    private EventSection eventSection;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "chests_items",
            joinColumns = @JoinColumn(name = "item_id"),
            inverseJoinColumns = @JoinColumn(name = "chest_id")
    )
    private List<Chest> chests;

    public abstract ItemType getItemType();

    @Override
    public RewardType getRewardType() {
        return RewardType.ITEM;
    }
}
