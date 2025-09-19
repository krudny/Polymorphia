package com.agh.polymorphia_backend.model.criterion;

import com.agh.polymorphia_backend.model.course.reward.Reward;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "criteria_rewards")
@Data
@Builder
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class CriterionReward {
    @EmbeddedId
    private Id id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("criterionId")
    @JoinColumn(name = "criterion_id")
    @ToString.Exclude
    @JsonIgnore
    private Criterion criterion;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("rewardId")
    @JoinColumn(name = "reward_id")
    @ToString.Exclude
    @JsonIgnore
    private Reward reward;

    @NotNull
    private Integer maxAmount;

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Id implements java.io.Serializable {
        @Column(name = "criterion_id", nullable = false)
        private Long criterionId;

        @Column(name = "reward_id", nullable = false)
        private Long rewardId;
    }
}
