package com.agh.polymorphia_backend.repository.gradable_event.projections;

public interface StudentGradableEventProjection {
    Long getId();
    String getName();
    String getTopic();
    Long getOrderIndex();
    Long getRoadMapOrderIndex();
    Boolean getIsLocked();
    String getGainedXp();
    Boolean getHasPossibleReward();
    Boolean getIsGraded();
    Boolean getIsRewardAssigned();
}
