package com.agh.polymorphia_backend.service.notification.creator;

import com.agh.polymorphia_backend.dto.request.notification.NotificationCreationRequest;
import com.agh.polymorphia_backend.model.notification.Notification;
import com.agh.polymorphia_backend.model.notification.NotificationType;
import com.agh.polymorphia_backend.model.notification.RewardNotification;
import com.agh.polymorphia_backend.model.reward.Reward;
import org.springframework.stereotype.Component;

@Component
public class NewRewardNotificationCreator implements NotificationCreator {

    @Override
    public Notification create(NotificationCreationRequest request) {
        Reward reward = request.getReward();
        String description = "Gratulacje! Otrzymałeś nową nagrodę: " + reward.getName();

        return RewardNotification.builder()
                .userId(request.getUserId())
                .description(description)
                .reward(reward)
                .build();
    }

    @Override
    public NotificationType getSupportedNotificationType() {
        return NotificationType.NEW_REWARD;
    }
}
