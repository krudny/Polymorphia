package com.agh.polymorphia_backend.model.hall_of_fame;

import com.fasterxml.jackson.annotation.JsonCreator;
import org.springframework.data.domain.Sort;

public enum SortOrder {
    ASC,
    DESC;

    public Sort.Direction getDirection() {
        return Sort.Direction.fromString(this.name());
    }

    @JsonCreator
    public static SortOrder fromString(String value) {
        if (value == null) return null;
        return SortOrder.valueOf(value.toUpperCase());
    }
}
