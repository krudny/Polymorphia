package com.agh.polymorphia_backend.dto.request.notification;

import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import com.agh.polymorphia_backend.model.notification.NotificationType;
import com.agh.polymorphia_backend.model.reward.Reward;
import com.agh.polymorphia_backend.model.user.student.EvolutionStage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class NotificationCreationRequest {
    private Long userId;
    private NotificationType notificationType;
    private GradableEvent gradableEvent;
    private EvolutionStage evolutionStage;
    private Reward reward;
}
