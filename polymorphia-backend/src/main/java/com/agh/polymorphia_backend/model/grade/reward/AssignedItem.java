package com.agh.polymorphia_backend.model.grade.reward;

import com.agh.polymorphia_backend.model.course.reward.item.Item;
import com.agh.polymorphia_backend.model.event.gradable.GradableEvent;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.Set;

@Entity
@Table(name = "assigned_items")
@NoArgsConstructor
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Data
public class AssignedItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Include
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_chest_id")
    @JsonBackReference
    @ToString.Exclude
    private AssignedChest assignedChest;

    @NotNull
    private Boolean used;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "boosted_gradable_events_items",
            joinColumns = @JoinColumn(name = "assigned_item_id"),
            inverseJoinColumns = @JoinColumn(name = "gradable_event_id")
    )
    @ToString.Exclude
    private Set<GradableEvent<?>> boostedGradableEvents;

}
