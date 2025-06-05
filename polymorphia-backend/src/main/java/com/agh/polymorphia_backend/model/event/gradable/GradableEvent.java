package com.agh.polymorphia_backend.model.event.gradable;

import com.agh.polymorphia_backend.model.event.section.EventSection;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

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
    @Positive
    @Column(precision = 4, scale = 1)
    private BigDecimal maxXp;

    public abstract T getEventSection();
}
