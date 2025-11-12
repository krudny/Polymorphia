package com.agh.polymorphia_backend.model.notification;

import com.agh.polymorphia_backend.model.course.reward.Reward;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@DiscriminatorValue("NEW_REWARD")
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class RewardNotification extends Notification {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reward_id")
    private Reward reward;

    @Override
    public NotificationType getNotificationType() {
        return NotificationType.NEW_REWARD;
    }

    @Override
    public Long getRelatedEntityId() {
        return reward != null ? reward.getId() : null;
    }
}
