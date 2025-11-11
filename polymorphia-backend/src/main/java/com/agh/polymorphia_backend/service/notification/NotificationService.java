package com.agh.polymorphia_backend.service.notification;

import com.agh.polymorphia_backend.dto.response.notification.NotificationResponseDto;
import com.agh.polymorphia_backend.repository.notification.NotificationRepository;
import com.agh.polymorphia_backend.service.mapper.NotificationMapper;
import com.agh.polymorphia_backend.service.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@AllArgsConstructor
@Service
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;
    private final UserService userService;
    private final SseNotificationService sseNotificationService;

    public Long getCurrentUserId() {
        return userService.getCurrentUser().getUser().getId();
    }

    public List<NotificationResponseDto> getAllNotificationsForUser() {
        Long userId = getCurrentUserId();

        return notificationRepository
                .findAllByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(notificationMapper::toNotificationResponseDto)
                .toList();
    }

    @Transactional
    public void deleteNotification(Long notificationId) {
        Long userId = getCurrentUserId();
        notificationRepository.deleteByIdAndUserId(notificationId, userId);

        Long remainingCount = notificationRepository.countByUserId(userId);
        sseNotificationService.sendUnreadCount(userId, remainingCount);
    }

    public void notifyUser(Long userId) {
        Long unreadCount = notificationRepository.countByUserId(userId);
        sseNotificationService.sendUnreadCount(userId, unreadCount);
    }
}
