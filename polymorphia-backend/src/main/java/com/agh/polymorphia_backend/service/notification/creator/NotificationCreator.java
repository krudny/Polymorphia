package com.agh.polymorphia_backend.service.notification.creator;

import com.agh.polymorphia_backend.dto.request.notification.NotificationCreationRequest;
import com.agh.polymorphia_backend.model.notification.Notification;
import com.agh.polymorphia_backend.model.notification.NotificationType;

public interface NotificationCreator {
    Notification create(NotificationCreationRequest request);
    NotificationType getSupportedNotificationType();
}