package com.agh.polymorphia_backend.model.gradable_event;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum GradableEventSortBy {
    ORDER_INDEX("ORDER_INDEX"),
    ROADMAP_ORDER_INDEX("ROADMAP_ORDER_INDEX");

    private final String value;

    public static GradableEventSortBy fromString(String value) {
        for (GradableEventSortBy sort : GradableEventSortBy.values()) {
            if (sort.value.equalsIgnoreCase(value)) {
                return sort;
            }
        }
        return ORDER_INDEX;
    }
}
