package com.agh.polymorphia_backend.model.hall_of_fame;

import org.springframework.data.domain.Sort;

public enum SortOrder {
    ASC,
    DESC;

    public Sort.Direction getDirection() {
        return Sort.Direction.fromString(this.name());
    }

    public static SortOrder fromString(String value) {
        return SortOrder.valueOf(value.toUpperCase());
    }
}
