package com.agh.polymorphia_backend.model.event.gradable;

import com.agh.polymorphia_backend.model.course.reward.Chest;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(
        name = "gradable_events_chests",
        uniqueConstraints = @UniqueConstraint(columnNames = {"gradable_event_id", "chest_id"})
)
@Inheritance(strategy = InheritanceType.JOINED)

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class GradableEventChest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Include
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gradable_event_id", nullable = false)
    private GradableEvent<?> gradableEvent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chest_id", nullable = false)
    private Chest chest;

    @NotNull
    @Column(name = "max_chests", nullable = false)
    private Integer maxChests;
}
