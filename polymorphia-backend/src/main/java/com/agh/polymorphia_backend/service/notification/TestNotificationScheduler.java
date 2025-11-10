package com.agh.polymorphia_backend.service.notification;

import com.agh.polymorphia_backend.dto.request.notification.NotificationCreationRequest;
import com.agh.polymorphia_backend.model.notification.NotificationType;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@AllArgsConstructor
@Slf4j
public class TestNotificationScheduler {
    private final NotificationDispatcher notificationDispatcher;
    private final SseNotificationService sseNotificationService;

    @Scheduled(fixedDelay = 15000)
    public void generateTestNotifications() {
        Set<Long> activeUserIds = sseNotificationService.getActiveUserIds();

        if (activeUserIds.isEmpty()) {
            log.debug("No active SSE connections, skipping test notifications");
            return;
        }

        activeUserIds.forEach(userId -> {
            try {
                NotificationCreationRequest request = NotificationCreationRequest.builder()
                        .userId(userId)
                        .notificationType(NotificationType.NEW_REWARD)
                        .reward(null)
                        .build();

                notificationDispatcher.dispatch(request);
                log.info("Generated test notification for user {}", userId);
            } catch (Exception e) {
                log.error("Error generating test notification for user {}", userId, e);
            }
        });
    }
}
