package com.agh.polymorphia_backend.repository.gradable_event.projections;

public interface InstructorGradableEventProjection {
    Long getId();
    String getName();
    Long getOrderIndex();
    Long getRoadMapOrderIndex();
    Boolean getIsHidden();
    Long getUngradedStudents();
    Boolean getIsLocked();
    Boolean getHasPossibleReward();
}
