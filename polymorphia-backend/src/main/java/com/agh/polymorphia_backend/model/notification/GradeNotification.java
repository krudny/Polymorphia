package com.agh.polymorphia_backend.model.notification;

import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import jakarta.persistence.*;

@Entity
@DiscriminatorValue("GRADABLE_EVENT")
public class GradableEventNotification extends Notification {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gradable_event_id")
    private GradableEvent gradableEvent;
}
