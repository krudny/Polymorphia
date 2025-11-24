package com.agh.polymorphia_backend.service.notification.creator;

import com.agh.polymorphia_backend.dto.request.notification.NotificationCreationRequest;
import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import com.agh.polymorphia_backend.model.notification.Notification;
import com.agh.polymorphia_backend.model.notification.NotificationType;
import org.springframework.stereotype.Component;

@Component
public class NewGradeNotificationCreator implements NotificationCreator {

    @Override
    public Notification create(NotificationCreationRequest request) {
        GradableEvent gradableEvent = request.getGradableEvent();
        String description = "Wydarzenie " + gradableEvent.getName() + " zostało ocenione!";

        return Notification.builder()
                .userId(request.getUserId())
                .description(description)
                .type(NotificationType.NEW_GRADE)
                .build();
    }

    @Override
    public NotificationType getSupportedNotificationType() {
        return NotificationType.NEW_GRADE;
    }
}