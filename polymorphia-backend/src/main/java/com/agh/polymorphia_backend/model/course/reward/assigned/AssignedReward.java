package com.agh.polymorphia_backend.model.course.reward.assigned;

import com.agh.polymorphia_backend.model.criterion.CriteriaGrade;
import com.agh.polymorphia_backend.model.course.reward.Reward;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "assigned_rewards")
@Data
@Builder
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class AssignedReward {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Include
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "criterion_grade_id")
    @ToString.Exclude
    @JsonIgnore
    private CriteriaGrade criteriaGrade;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reward_id")
    @ToString.Exclude
    @JsonIgnore
    private Reward reward;

    @NotNull
    private LocalDateTime receivedDate;

    private LocalDateTime usedDate;

    @NotNull
    private Boolean isUsed;
}
