package com.agh.polymorphia_backend.model.course.reward.assigned;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "assigned_chests")
@Data
@Builder
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class AssignedChest {
    @Id
    @Column(name = "assigned_reward_id")
    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Include
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @MapsId
    @JoinColumn(name = "assigned_reward_id")
    @ToString.Exclude
    @JsonIgnore
    private AssignedReward assignedReward;
}
