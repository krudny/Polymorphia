package com.agh.polymorphia_backend.model.course.reward.assigned;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "assigned_items")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class AssignedItem {
    @Id
    @Column(name = "assigned_reward_id")
    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Include
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "assigned_reward_id")
    @ToString.Exclude
    @JsonIgnore
    private AssignedReward assignedReward;
}
