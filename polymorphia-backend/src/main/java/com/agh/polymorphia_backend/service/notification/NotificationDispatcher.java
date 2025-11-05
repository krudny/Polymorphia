package com.agh.polymorphia_backend.service.notification;

import com.agh.polymorphia_backend.dto.request.notification.NotificationCreationRequest;
import com.agh.polymorphia_backend.model.notification.Notification;
import com.agh.polymorphia_backend.model.notification.NotificationType;
import com.agh.polymorphia_backend.repository.notification.NotificationRepository;
import com.agh.polymorphia_backend.service.notification.creator.NotificationCreator;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class NotificationDispatcher {
    private final NotificationFactory notificationFactory;
    private final NotificationRepository notificationRepository;

    @Transactional
    public void dispatch(NotificationType type, NotificationCreationRequest request) {
        type.validate(request);

        NotificationCreator creator = notificationFactory.getCreator(type);
        Notification notification = creator.create(request);
        notificationRepository.save(notification);
    }
}