package com.agh.polymorphia_backend.service.notification;

import com.agh.polymorphia_backend.dto.request.notification.NotificationCreationRequest;
import com.agh.polymorphia_backend.model.notification.Notification;
import com.agh.polymorphia_backend.model.notification.NotificationType;
import com.agh.polymorphia_backend.repository.notification.NotificationRepository;
import com.agh.polymorphia_backend.service.notification.creator.NotificationCreator;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
@Slf4j
public class NotificationDispatcher {
    private static final String FAILED_TO_CREATE_NOTIFICATION = "Failed to create notification";
    private final NotificationRepository notificationRepository;
    private final NotificationFactory notificationFactory;

    @Transactional
    public void dispatch(NotificationCreationRequest request) {
        try {
            NotificationType type = request.getNotificationType();
            type.validate(request);

            NotificationCreator creator = notificationFactory.getCreator(type);
            Notification notification = creator.create(request);
            notificationRepository.save(notification);
        } catch (IllegalArgumentException e) {
            log.warn(FAILED_TO_CREATE_NOTIFICATION, e);
        }
    }
}