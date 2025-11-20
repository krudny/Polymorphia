package com.agh.polymorphia_backend.repository.gradable_event.projections;

public interface TeachingRoleGradableEventProjection extends BaseGradableEventProjection {
    Long getUngradedStudents();
    Boolean getHasPossibleReward();
}
