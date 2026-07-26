package com.agh.polymorphia_backend.service.task;

import com.agh.polymorphia_backend.model.gradable_event.subtypes.task.TaskOutputMatch;
import org.springframework.stereotype.Component;


@Component
public class TaskOutputMatcher {

    public boolean matches(TaskOutputMatch outputMatch, String expected, String actual) {
        if (expected == null || actual == null) {
            return false;
        }
        return switch (outputMatch) {
            case EXACT -> expected.equals(actual);
        };
    }
}