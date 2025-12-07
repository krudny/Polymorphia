package com.agh.polymorphia_backend.dto.request.notification;

import com.agh.polymorphia_backend.model.reward.Reward;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class RewardNotificationRequest extends NotificationCreationRequest {
    @NotNull
    private Reward reward;
}
