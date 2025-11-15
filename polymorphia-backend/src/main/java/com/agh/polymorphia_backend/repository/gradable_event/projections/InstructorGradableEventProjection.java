package com.agh.polymorphia_backend.repository.gradable_event.projections;

public interface InstructorGradableEventProjection extends BaseGradableEventProjection {
    Long getUngradedStudents();
    Boolean getHasPossibleReward();
}
