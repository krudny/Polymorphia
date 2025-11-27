package com.agh.polymorphia_backend.dto.request.notification;

import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.experimental.SuperBuilder;


@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class GradeNotificationRequest extends NotificationCreationRequest {
    @NonNull
    private GradableEvent gradableEvent;
}
