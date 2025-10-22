package com.agh.polymorphia_backend.model.criterion;

import com.agh.polymorphia_backend.model.gradable_event.Grade;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "criteria_grades")
@Data
@Builder
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class CriterionGrade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Include
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "grade_id")
    @ToString.Exclude
    @JsonIgnore
    private Grade grade;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "criterion_id")
    @ToString.Exclude
    @JsonIgnore
    private Criterion criterion;

    @NotNull
    @Column(precision = 4, scale = 1)
    private BigDecimal xp;
}
