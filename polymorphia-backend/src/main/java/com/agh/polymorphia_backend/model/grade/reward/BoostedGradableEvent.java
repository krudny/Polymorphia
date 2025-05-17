package com.agh.polymorphia_backend.model.grade.reward;

import com.agh.polymorphia_backend.model.event.gradable.GradableEvent;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "boosted_gradable_events_items")
@NoArgsConstructor
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Data
public class BoostedGradableEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Include
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_item_id")
    @ToString.Exclude
    private AssignedItem assignedItem;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gradable_event_id")
    @ToString.Exclude
    private GradableEvent<?> gradableEvent;

    @NotNull
    private Integer flatBonusXp;
}
