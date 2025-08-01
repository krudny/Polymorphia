package com.agh.polymorphia_backend.model.event.criteria;

import com.agh.polymorphia_backend.model.course.reward.Chest;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(
        name = "criteria_chests",
        uniqueConstraints = @UniqueConstraint(columnNames = {"criterion_id", "chest_id"})
)
@Inheritance(strategy = InheritanceType.JOINED)

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class CriterionChest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Include
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "criterion_id", nullable = false)
    private Criterion criterion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chest_id", nullable = false)
    private Chest chest;

    @NotNull
    @Column(name = "chests_limit", nullable = false)
    private Integer chestsLimit;
}
