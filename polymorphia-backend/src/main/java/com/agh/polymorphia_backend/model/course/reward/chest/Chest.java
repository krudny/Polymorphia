package com.agh.polymorphia_backend.model.course.reward.chest;

import com.agh.polymorphia_backend.model.course.reward.Reward;
import com.agh.polymorphia_backend.model.course.reward.item.Item;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;

@Entity
@Data
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Builder
@Table(name = "chests")
@PrimaryKeyJoinColumn(name = "reward_id")
@EqualsAndHashCode(onlyExplicitlyIncluded = true, callSuper = false)
@ToString(exclude = {"items"})
public class Chest extends Reward {
    @ManyToMany(mappedBy = "chests", fetch = FetchType.LAZY)
    private List<Item> items;
    @NotNull
    @Enumerated(EnumType.STRING)
    private ChestBehavior behavior;
}
