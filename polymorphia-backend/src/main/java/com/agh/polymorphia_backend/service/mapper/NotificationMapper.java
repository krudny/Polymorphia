package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.response.notification.NotificationResponseDto;
import com.agh.polymorphia_backend.model.notification.Notification;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class NotificationMapper {

    public NotificationResponseDto toNotificationResponseDto(Notification notification) {
        return NotificationResponseDto.builder()
                .id(notification.getId())
                .notificationType(notification.getNotificationType())
                .description(notification.getDescription())
                .createdAt(notification.getCreatedAt())
                .gradableEventId(notification.getGradableEvent().getId())
                .rewardId(notification.getReward().getId())
                .build();
    }
}
