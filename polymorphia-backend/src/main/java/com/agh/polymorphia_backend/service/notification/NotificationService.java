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

    public List<NotificationResponseDto> getAllNotificationsForUser() {
        Long userId = userService.getCurrentUser().getUser().getId();

        return notificationRepository
                .findAllByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(notificationMapper::toNotificationResponseDto)
                .toList();
    }

    @Transactional
    public void deleteNotification(Long notificationId) {
        Long userId = userService.getCurrentUser().getUser().getId();
        notificationRepository.deleteByIdAndUserId(notificationId, userId);
    }
}
