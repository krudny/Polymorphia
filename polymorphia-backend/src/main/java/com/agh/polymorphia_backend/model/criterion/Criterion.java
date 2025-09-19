package com.agh.polymorphia_backend.model.criterion;

import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "criteria")
@Data
@Builder
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Criterion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Include
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gradable_event_id")
    @ToString.Exclude
    @JsonIgnore
    private GradableEvent gradableEvent;

    @NotNull
    @Column(length = 64)
    private String name;

    @NotNull
    private Integer maxXp;
}
