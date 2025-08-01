package com.agh.polymorphia_backend.model.event.gradable;

import com.agh.polymorphia_backend.model.event.criteria.Criterion;
import com.agh.polymorphia_backend.model.event.section.EventSection;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
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
public abstract class GradableEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Include
    private Long id;

    @ManyToOne
    @JoinColumn(name = "event_section_id")
    private EventSection eventSection;

    @NotNull
    private String name;

    @NotNull
    private String topic;

    @NotNull
    private Boolean hidden;

    @NotNull
    @Positive
    private Long orderIndex;

    @NotNull
    @Positive
    private Integer roadMapOrder;

    private String markdownSourceUrl;

    private String markdown;

    @OneToMany(mappedBy = "gradableEvent", fetch = FetchType.LAZY)
    @JsonManagedReference
    @ToString.Exclude
    private Set<Criterion> criteria;

}
