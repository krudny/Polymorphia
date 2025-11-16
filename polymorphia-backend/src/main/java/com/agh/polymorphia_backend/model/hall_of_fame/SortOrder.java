package com.agh.polymorphia_backend.model.hall_of_fame;

import com.fasterxml.jackson.annotation.JsonCreator;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public enum SortOrder {
    ASC,
    DESC;

    @JsonCreator
    public static SortOrder fromString(String value) {
        if (value == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Parametr \"sortOrder\" jest wymagany.");
        return SortOrder.valueOf(value.toUpperCase());
    }

    public Sort.Direction getDirection() {
        return Sort.Direction.fromString(this.name());
    }
}
