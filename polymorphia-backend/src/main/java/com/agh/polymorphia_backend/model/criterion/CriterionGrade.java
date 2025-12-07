package com.agh.polymorphia_backend.model.criterion;


import com.agh.polymorphia_backend.model.grade.Grade;
import com.agh.polymorphia_backend.model.reward.assigned.AssignedReward;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

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
    @JsonIgnore
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Grade grade;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "criterion_id")
    @JsonIgnore
    private Criterion criterion;

    @NotNull
    @Column(precision = 4, scale = 1)
    private BigDecimal xp;

    @OneToMany(
            mappedBy = "criterionGrade",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @NotNull
    @ToString.Exclude
    @JsonIgnore
    @Builder.Default
    private List<AssignedReward> assignedRewards = new ArrayList<>();
}
