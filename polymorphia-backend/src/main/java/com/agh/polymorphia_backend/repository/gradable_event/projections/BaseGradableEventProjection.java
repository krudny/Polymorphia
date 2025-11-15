package com.agh.polymorphia_backend.repository.gradable_event.projections;

public interface BaseGradableEventProjection {
    Long getId();
    String getName();
    String getTopic();
    Long getOrderIndex();
    Long getRoadMapOrderIndex();
    Boolean getIsHidden();
    Boolean getIsLocked();
    String getEventSectionType();
}
