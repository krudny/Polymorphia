package com.agh.polymorphia_backend.model.event.gradable;

import com.agh.polymorphia_backend.model.event.section.EventSection;
import com.agh.polymorphia_backend.model.grade.reward.AssignedItem;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "gradable_events")
@Inheritance(strategy = InheritanceType.JOINED)

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public abstract class GradableEvent<T extends EventSection> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Include
    private Long id;

    @NotNull
    private Integer maxXp;

    @OneToMany(mappedBy = "gradableEvent", fetch = FetchType.LAZY)
    private List<GradableEventChest> gradableEventChests;

    @ManyToMany(mappedBy = "boostedGradableEvents", fetch = FetchType.LAZY)
    @JsonManagedReference
    @ToString.Exclude
    Set<AssignedItem> items;

    public abstract T getEventSection();

    public abstract void setEventSection(T eventSection);
}
