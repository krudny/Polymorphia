package com.agh.polymorphia_backend.repository.gradable_event.projections;

public interface StudentGradableEventProjection {
    Long getId();
    String getName();
    Long getOrderIndex();
    Long getRoadMapOrderIndex();
    Boolean getIsHidden();
    Long getGainedXp();
    Boolean getHasPossibleReward();
    Boolean getIsGraded();
    Boolean getIsRewardAssigned();
}
