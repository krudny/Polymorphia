package com.agh.polymorphia_backend.service.notification.creator;

import com.agh.polymorphia_backend.dto.request.notification.NotificationCreationRequest;
import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import com.agh.polymorphia_backend.model.notification.Notification;
import com.agh.polymorphia_backend.model.notification.NotificationType;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;

@Component
public class NewGradeNotificationCreator implements NotificationCreator {

    @Override
    public Notification create(NotificationCreationRequest request) {
        GradableEvent event = request.getGradableEvent();
        String description = "Pojawiło się nowe zadanie do oceny: " + event.getName();

        return Notification.builder()
                .userId(request.getUserId())
                .notificationType(getSupportedNotificationType())
                .createdAt(ZonedDateTime.now())
                .description(description)
                .gradableEvent(event)
                .build();
    }

    @Override
    public NotificationType getSupportedNotificationType() {
        return NotificationType.NEW_GRADE;
    }
}