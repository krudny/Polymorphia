package com.agh.polymorphia_backend.model.notification;

import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@DiscriminatorValue("NEW_GRADE")
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class GradeNotification extends Notification {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gradable_event_id")
    private GradableEvent gradableEvent;

    @Override
    public NotificationType getNotificationType() {
        return NotificationType.NEW_GRADE;
    }

    @Override
    public Long getRelatedEntityId() {
        return gradableEvent != null ? gradableEvent.getId() : null;
    }
}
