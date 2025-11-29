package com.agh.polymorphia_backend.dto.request.notification;

import com.agh.polymorphia_backend.model.notification.NotificationType;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public abstract class NotificationCreationRequest {
    @NotNull
    private Long userId;

    @NotNull
    private NotificationType notificationType;
}