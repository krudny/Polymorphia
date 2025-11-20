package com.agh.polymorphia_backend.repository.gradable_event;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface StudentActivityProjection {
    Long getId();
    String getGradableEventName();
    BigDecimal getGainedXp();
    Boolean getHasReward();
    LocalDateTime getGradeDate();
}
