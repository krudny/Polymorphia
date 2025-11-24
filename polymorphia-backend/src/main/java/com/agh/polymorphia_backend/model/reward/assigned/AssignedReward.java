package com.agh.polymorphia_backend.model.reward.assigned;

import com.agh.polymorphia_backend.model.criterion.CriterionGrade;
import com.agh.polymorphia_backend.model.reward.Reward;
import com.agh.polymorphia_backend.model.reward.RewardType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.ZonedDateTime;

@Entity
@Table(name = "assigned_rewards")
@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Inheritance(strategy = InheritanceType.JOINED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public abstract class AssignedReward {
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
    private CriterionGrade criterionGrade;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reward_id")
    @ToString.Exclude
    @JsonIgnore
    private Reward reward;

    @NotNull
    private ZonedDateTime receivedDate;

    private ZonedDateTime usedDate;

    @NotNull
    private Boolean isUsed;

    public abstract RewardType getType();
}
