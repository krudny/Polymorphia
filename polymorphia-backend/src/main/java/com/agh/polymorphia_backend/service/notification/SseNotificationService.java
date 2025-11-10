package com.agh.polymorphia_backend.service.notification;

import com.agh.polymorphia_backend.dto.response.notification.NotificationResponseDto;
import com.agh.polymorphia_backend.service.user.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
@Slf4j
@AllArgsConstructor
public class SseNotificationService {
    private final ConcurrentHashMap<Long, CopyOnWriteArrayList<SseEmitter>> userEmitters =
            new ConcurrentHashMap<>();
    private final UserService userService;

    public SseEmitter subscribe() {
        Long userId = userService.getCurrentUser().getUserId();
        SseEmitter emitter = new SseEmitter(30 * 60 * 1000L);

        userEmitters.computeIfAbsent(userId, k -> new CopyOnWriteArrayList<>()).add(emitter);

        log.info("User {} subscribed to SSE notifications. Total connections: {}",
                userId, userEmitters.get(userId).size());

        emitter.onCompletion(() -> {
            log.info("SSE connection completed for user {}", userId);
            removeEmitter(userId, emitter);
        });

        emitter.onTimeout(() -> {
            log.warn("SSE connection timed out for user {}", userId);
            emitter.complete();
            removeEmitter(userId, emitter);
        });

        emitter.onError(throwable -> {
            log.error("SSE error for user {}: {}", userId, throwable.getMessage());
            removeEmitter(userId, emitter);
        });

        try {
            emitter.send(SseEmitter.event()
                    .name("connected")
                    .data("Successfully connected to notification stream"));
        } catch (IOException e) {
            log.error("Error sending initial connection event to user {}", userId, e);
            removeEmitter(userId, emitter);
        }

        return emitter;
    }

    public void sendNotificationToUser(Long userId, NotificationResponseDto notification) {
        List<SseEmitter> emitters = userEmitters.get(userId);

        if (emitters == null || emitters.isEmpty()) {
            log.debug("No active SSE connections for user {}", userId);
            return;
        }

        log.info("Sending notification to user {} via {} active connection(s)",
                userId, emitters.size());

        List<SseEmitter> deadEmitters = new CopyOnWriteArrayList<>();

        emitters.forEach(emitter -> {
            try {
                emitter.send(SseEmitter.event()
                        .name("notification")
                        .data(notification));

                log.debug("Successfully sent notification {} to user {}",
                        notification.getId(), userId);
            } catch (IOException e) {
                log.error("Failed to send notification to user {}: {}", userId, e.getMessage());
                deadEmitters.add(emitter);
            }
        });

        deadEmitters.forEach(emitter -> removeEmitter(userId, emitter));
    }

    public void sendUnreadCount(Long userId, Long count) {
        List<SseEmitter> emitters = userEmitters.get(userId);

        if (emitters == null || emitters.isEmpty()) {
            log.debug("No active SSE connections for user {} to send count", userId);
            return;
        }

        log.debug("Sending unread count {} to user {}", count, userId);

        emitters.forEach(emitter -> {
            try {
                emitter.send(SseEmitter.event()
                        .name("unread-count")
                        .data(count));
            } catch (IOException e) {
                log.error("Failed to send unread count to user {}: {}", userId, e.getMessage());
            }
        });
    }

    private void removeEmitter(Long userId, SseEmitter emitter) {
        List<SseEmitter> emitters = userEmitters.get(userId);
        if (emitters != null) {
            emitters.remove(emitter);
            log.debug("Removed emitter for user {}. Remaining connections: {}",
                    userId, emitters.size());

            if (emitters.isEmpty()) {
                userEmitters.remove(userId);
                log.info("All SSE connections closed for user {}", userId);
            }
        }
    }

    public Set<Long> getActiveUserIds() {
        return userEmitters.keySet();
    }
}
