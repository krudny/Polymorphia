package com.agh.polymorphia_backend.service.notification;

import com.agh.polymorphia_backend.model.notification.NotificationType;
import com.agh.polymorphia_backend.service.notification.creator.NotificationCreator;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class NotificationFactory {
    private final Map<NotificationType, NotificationCreator> creators;

    public NotificationFactory(List<NotificationCreator> creatorList) {
        this.creators = creatorList.stream()
                .collect(Collectors.toMap(NotificationCreator::getSupportedNotificationType, Function.identity()));
    }

    public NotificationCreator getCreator(NotificationType type) {
        NotificationCreator creator = creators.get(type);
        if (creator == null) {
            throw new IllegalArgumentException("Nie znaleziono kreatora dla typu powiadomienia: " + type);
        }
        return creator;
    }
}