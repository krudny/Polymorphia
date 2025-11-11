package com.agh.polymorphia_backend.service.notification;

import com.agh.polymorphia_backend.service.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
@AllArgsConstructor
public class SseNotificationService {
    private final ConcurrentHashMap<Long, CopyOnWriteArrayList<SseEmitter>> userEmitters =
            new ConcurrentHashMap<>();
    private final UserService userService;

    public SseEmitter subscribe() {
        Long userId = userService.getCurrentUser().getUserId();;
        SseEmitter emitter = new SseEmitter(30 * 60 * 1000L);

        userEmitters.computeIfAbsent(userId, k -> new CopyOnWriteArrayList<>()).add(emitter);

        emitter.onCompletion(() -> removeEmitter(userId, emitter));

        emitter.onTimeout(() -> {
            emitter.complete();
            removeEmitter(userId, emitter);
        });

        emitter.onError(throwable -> removeEmitter(userId, emitter));

        try {
            emitter.send(SseEmitter.event()
                    .name("connected")
                    .data("Successfully connected to notification stream"));
        } catch (IOException e) {
            removeEmitter(userId, emitter);
        }

        return emitter;
    }

    public void sendUnreadCount(Long userId, Long count) {
        List<SseEmitter> emitters = userEmitters.get(userId);
        List<SseEmitter> deadEmitters = new CopyOnWriteArrayList<>();

        if (emitters == null || emitters.isEmpty()) {
            return;
        }


        emitters.forEach(emitter -> {
            try {
                emitter.send(SseEmitter.event()
                        .name("unread-count")
                        .data(count));
            } catch (IOException e) {
                deadEmitters.add(emitter);
            }
        });

        deadEmitters.forEach(emitter -> removeEmitter(userId, emitter));
    }

    private void removeEmitter(Long userId, SseEmitter emitter) {
        List<SseEmitter> emitters = userEmitters.get(userId);
        if (emitters != null) {
            emitters.remove(emitter);

            if (emitters.isEmpty()) {
                userEmitters.remove(userId);
            }
        }
    }

    public Set<Long> getActiveUserIds() {
        return userEmitters.keySet();
    }
}
