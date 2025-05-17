package com.agh.polymorphia_backend.model.event.gradable;

import com.agh.polymorphia_backend.model.event.section.EventSection;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

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

    public abstract T getEventSection();

    public abstract void setEventSection(T eventSection);
}
