package com.agh.polymorphia_backend.repository.gradable_event.projections;

import java.math.BigDecimal;

public interface StudentGradableEventProjection extends BaseGradableEventProjection {
    BigDecimal getGainedXp();
    Boolean getHasPossibleReward();
    Boolean getIsGraded();
    Boolean getIsRewardAssigned();
}
