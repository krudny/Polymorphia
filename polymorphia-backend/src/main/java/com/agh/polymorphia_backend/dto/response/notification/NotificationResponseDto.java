package com.agh.polymorphia_backend.dto.response.notification;

import com.agh.polymorphia_backend.model.notification.NotificationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

import java.time.ZonedDateTime;

@Data
@Builder
public class NotificationResponseDto {
    @Id
    private Long id;

    @NotNull
    private NotificationType notificationType;

    @NotNull
    private ZonedDateTime createdAt;

    @NotEmpty
    private String description;
}