package com.agh.polymorphia_backend.repository.gradable_event.projections;

public interface StudentGradableEventProjection extends BaseGradableEventProjection {
    String getGainedXp();
    Boolean getHasPossibleReward();
    Boolean getIsGraded();
    Boolean getIsRewardAssigned();
}
