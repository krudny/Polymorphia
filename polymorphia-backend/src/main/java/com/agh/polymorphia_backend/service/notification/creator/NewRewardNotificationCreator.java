package com.agh.polymorphia_backend.service.notification.creator;

import com.agh.polymorphia_backend.dto.request.notification.NotificationCreationRequest;
import com.agh.polymorphia_backend.model.course.reward.Reward;
import com.agh.polymorphia_backend.model.notification.Notification;
import com.agh.polymorphia_backend.model.notification.NotificationType;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;

@Component
public class NewRewardNotificationCreator implements NotificationCreator {

    @Override
    public Notification create(NotificationCreationRequest request) {
        Reward reward = request.getReward();
        String description = "Gratulacje! Otrzymałeś nową nagrodę: " + reward.getName();

        return Notification.builder()
                .userId(request.getUserId())
                .notificationType(getSupportedNotificationType())
                .createdAt(ZonedDateTime.now())
                .description(description)
                .reward(reward)
                .build();
    }

    @Override
    public NotificationType getSupportedNotificationType() {
        return NotificationType.NEW_REWARD; // Załóżmy, że taki typ istnieje w enumie
    }
}
