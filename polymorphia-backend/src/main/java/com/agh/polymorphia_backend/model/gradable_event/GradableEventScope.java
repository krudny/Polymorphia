package com.agh.polymorphia_backend.model.gradable_event;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum GradableEventScope {
    COURSE("COURSE"),
    EVENT_SECTION("EVENT_SECTION");

    private final String value;

    public static GradableEventScope fromString(String value) {
        for (GradableEventScope scope : GradableEventScope.values()) {
            if (scope.value.equalsIgnoreCase(value)) {
                return scope;
            }
        }
        return EVENT_SECTION;
    }
}
