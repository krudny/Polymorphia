package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.response.notification.NotificationResponseDto;
import com.agh.polymorphia_backend.model.course.reward.Reward;
import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import com.agh.polymorphia_backend.model.notification.Notification;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class NotificationMapper {

    public NotificationResponseDto toNotificationResponseDto(Notification notification) {
        Long gradableEventId = Optional.ofNullable(notification.getGradableEvent())
                .map(GradableEvent::getId)
                .orElse(null);

        Long rewardId = Optional.ofNullable(notification.getReward())
                .map(Reward::getId)
                .orElse(null);

        return NotificationResponseDto.builder()
                .id(notification.getId())
                .notificationType(notification.getNotificationType())
                .description(notification.getDescription())
                .createdAt(notification.getCreatedAt())
                .gradableEventId(gradableEventId)
                .rewardId(rewardId)
                .build();
    }
}
