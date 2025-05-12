package com.agh.polymorphia_backend.model.event.gradable;

import com.agh.polymorphia_backend.model.course.reward.Chest;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.Set;

@Entity
@Table(name = "gradable_events")
@Inheritance(strategy = InheritanceType.JOINED)

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class GradableEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Include
    private Long id;

    @NotNull
    private Integer maxXp;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "gradable_events_chests",
            joinColumns = @JoinColumn(name = "gradable_event_id"),
            inverseJoinColumns = @JoinColumn(name = "chest_id")
    )
    private Set<Chest> chests;
}
