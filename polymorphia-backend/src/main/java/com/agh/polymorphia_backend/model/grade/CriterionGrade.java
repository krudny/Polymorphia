package com.agh.polymorphia_backend.model.grade;

import com.agh.polymorphia_backend.model.event.criteria.Criterion;
import com.agh.polymorphia_backend.model.grade.reward.AssignedChest;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.Set;

@Entity
@Table(name = "criteria_grades")
@Data
@SuperBuilder
@NoArgsConstructor
public class CriterionGrade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Include
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "grade_id")
    @JsonIgnore
    @ToString.Exclude
    private Grade grade;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "criterion_id")
    @JsonIgnore
    @ToString.Exclude
    private Criterion criterion;

    @NotNull
    @PositiveOrZero
    @Column(precision = 4, scale = 1)
    private BigDecimal xp;

    @OneToMany(mappedBy = "criterionGrade", fetch = FetchType.LAZY)
    private Set<AssignedChest> assignedChests;
}
