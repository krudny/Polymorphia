package com.agh.polymorphia_backend.validation.validator;

import com.agh.polymorphia_backend.model.event_section.EventSectionType;
import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import com.agh.polymorphia_backend.validation.constraint.ProjectGradableEventOnly;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ProjectGradableEventValidator implements ConstraintValidator<ProjectGradableEventOnly, GradableEvent> {

    @Override
    public boolean isValid(GradableEvent gradableEvent, ConstraintValidatorContext context) {
        return gradableEvent.getEventSection().getEventSectionType() == EventSectionType.PROJECT;
    }
}
