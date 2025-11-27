package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.response.notification.NotificationResponseDto;
import com.agh.polymorphia_backend.model.notification.Notification;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class NotificationMapper {

    public NotificationResponseDto toNotificationResponseDto(Notification notification) {
        return NotificationResponseDto.builder()
                .id(notification.getId())
                .notificationType(notification.getType())
                .description(notification.getDescription())
                .createdAt(notification.getCreatedAt())
                .build();
    }
}
