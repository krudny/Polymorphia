package com.agh.polymorphia_backend.dto.request.target_list;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public enum GradeStatus {
    ALL,
    GRADED,
    UNGRADED;

    private static final String ALL_FIELD_NAME = "all";
    private static final String GRADED_FIELD_NAME = "graded";
    private static final String UNGRADED_FIELD_NAME = "ungraded";


    @JsonCreator
    public static GradeStatus fromString(String value) {
        return switch (value) {
            case ALL_FIELD_NAME -> ALL;
            case GRADED_FIELD_NAME -> GRADED;
            case UNGRADED_FIELD_NAME -> UNGRADED;
            default -> throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Wartość " + value + " jest niepoprawna dla parametru \"gradeStatus\"."
            );
        };
    }

    @JsonValue
    public String toString() {
        return switch (this) {
            case ALL -> ALL_FIELD_NAME;
            case GRADED -> GRADED_FIELD_NAME;
            case UNGRADED -> UNGRADED_FIELD_NAME;
        };
    }
}
