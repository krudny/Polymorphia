package com.agh.polymorphia_backend.repository.grade.projections;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface StudentActivityProjection {
    Long getId();
    String getGradableEventName();
    BigDecimal getGainedXp();
    Boolean getHasReward();
    LocalDateTime getGradeDate();
}
