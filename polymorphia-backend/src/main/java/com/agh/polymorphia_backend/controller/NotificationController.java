package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.service.notification.SseNotificationService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;


@RestController
@RequestMapping("/notifications")
@AllArgsConstructor
public class NotificationController {
    private final SseNotificationService sseNotificationService;

    @GetMapping(value = "/stream/count", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter streamNotificationCount() {
        return sseNotificationService.subscribeToCount();
    }

    @GetMapping(value = "/stream/notifications", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter streamNotifications() {
        return sseNotificationService.subscribeToNotifications();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotification(@PathVariable Long id) {
        sseNotificationService.deleteNotification(id);
        return ResponseEntity.noContent().build();
    }
}

