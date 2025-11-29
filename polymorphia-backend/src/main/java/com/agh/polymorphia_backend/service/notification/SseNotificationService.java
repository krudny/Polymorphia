package com.agh.polymorphia_backend.service.notification;

import com.agh.polymorphia_backend.dto.response.notification.NotificationResponseDto;
import com.agh.polymorphia_backend.repository.notification.NotificationRepository;
import com.agh.polymorphia_backend.service.mapper.NotificationMapper;
import com.agh.polymorphia_backend.service.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
@AllArgsConstructor
public class SseNotificationService {
    private final ConcurrentHashMap<Long, CopyOnWriteArrayList<SseEmitter>> countEmitters = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<Long, CopyOnWriteArrayList<SseEmitter>> notificationEmitters = new ConcurrentHashMap<>();
    private final UserService userService;
    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;

    public SseEmitter subscribeToCount() {
        Long userId = userService.getCurrentUser().getUserId();
        SseEmitter emitter = new SseEmitter(30 * 60 * 1000L);

        countEmitters.computeIfAbsent(userId, k -> new CopyOnWriteArrayList<>()).add(emitter);

        emitter.onCompletion(() -> removeCountEmitter(userId, emitter));
        emitter.onTimeout(() -> {
            emitter.complete();
            removeCountEmitter(userId, emitter);
        });
        emitter.onError(throwable -> removeCountEmitter(userId, emitter));

        try {
            emitter.send(SseEmitter.event()
                    .name("connected")
                    .data("Connected to count stream"));

            sendUnreadCount(userId);
        } catch (IOException e) {
            removeCountEmitter(userId, emitter);
        }

        return emitter;
    }

    public SseEmitter subscribeToNotifications() {
        Long userId = userService.getCurrentUser().getUserId();
        SseEmitter emitter = new SseEmitter(30 * 60 * 1000L);

        notificationEmitters.computeIfAbsent(userId, k -> new CopyOnWriteArrayList<>()).add(emitter);

        emitter.onCompletion(() -> removeNotificationEmitter(userId, emitter));
        emitter.onTimeout(() -> {
            emitter.complete();
            removeNotificationEmitter(userId, emitter);
        });
        emitter.onError(throwable -> removeNotificationEmitter(userId, emitter));

        try {
            emitter.send(SseEmitter.event()
                    .name("connected")
                    .data("Connected to notifications stream"));

            List<NotificationResponseDto> notifications = getAllNotificationsForUser(userId);

            for (NotificationResponseDto notification : notifications) {
                emitter.send(SseEmitter.event()
                        .name("notification")
                        .data(notification));
            }
        } catch (IOException e) {
            removeNotificationEmitter(userId, emitter);
        }

        return emitter;
    }

    public void sendUnreadCount(Long userId) {
        List<SseEmitter> emitters = countEmitters.get(userId);
        if (emitters == null || emitters.isEmpty()) {
            return;
        }

        List<SseEmitter> deadEmitters = new CopyOnWriteArrayList<>();

        emitters.forEach(emitter -> {
            try {
                emitter.send(SseEmitter.event()
                        .name("unread-count")
                        .data(notificationRepository.countByUserId(userId)));
            } catch (IOException e) {
                deadEmitters.add(emitter);
            }
        });

        deadEmitters.forEach(emitter -> removeCountEmitter(userId, emitter));
    }

    public void sendNotification(Long userId, NotificationResponseDto notification) {
        List<SseEmitter> emitters = notificationEmitters.get(userId);
        if (emitters == null || emitters.isEmpty()) {
            return;
        }

        List<SseEmitter> deadEmitters = new CopyOnWriteArrayList<>();

        emitters.forEach(emitter -> {
            try {
                emitter.send(SseEmitter.event()
                        .name("notification")
                        .data(notification));
            } catch (IOException e) {
                deadEmitters.add(emitter);
            }
        });

        deadEmitters.forEach(emitter -> removeNotificationEmitter(userId, emitter));
    }

    private void removeCountEmitter(Long userId, SseEmitter emitter) {
        List<SseEmitter> emitters = countEmitters.get(userId);
        if (emitters != null) {
            emitters.remove(emitter);
            if (emitters.isEmpty()) {
                countEmitters.remove(userId);
            }
        }
    }

    private void removeNotificationEmitter(Long userId, SseEmitter emitter) {
        List<SseEmitter> emitters = notificationEmitters.get(userId);
        if (emitters != null) {
            emitters.remove(emitter);
            if (emitters.isEmpty()) {
                notificationEmitters.remove(userId);
            }
        }
    }

    @Transactional
    public void deleteNotification(Long notificationId) {
        Long userId = userService.getCurrentUser().getUser().getId();
        notificationRepository.deleteByIdAndUserId(notificationId, userId);
        sendUnreadCount(userId);
    }

    private List<NotificationResponseDto> getAllNotificationsForUser(Long userId) {
        return notificationRepository
                .findAllByUserIdOrderByCreatedAtAsc(userId)
                .stream()
                .map(notificationMapper::toNotificationResponseDto)
                .toList();
    }
}
