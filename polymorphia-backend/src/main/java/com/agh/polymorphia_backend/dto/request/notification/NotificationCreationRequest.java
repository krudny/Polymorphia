package com.agh.polymorphia_backend.dto.request.notification;

import com.agh.polymorphia_backend.model.course.EvolutionStage;
import com.agh.polymorphia_backend.model.course.reward.Reward;
import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class NotificationCreationRequest {
    private Long userId;
    private GradableEvent gradableEvent;
    private EvolutionStage evolutionStage;
    private Reward reward;
}
