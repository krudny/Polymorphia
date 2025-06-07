package com.agh.polymorphia_backend.dto.request.grade;

import com.fasterxml.jackson.annotation.JsonValue;

public enum EventSectionType {
    ASSIGNMENT("assignment"),
    TEST("test"),
    PROJECT("project");

    private final String jsonValue;

    EventSectionType(String jsonValue) {
        this.jsonValue = jsonValue;
    }

    @JsonValue
    public String getJsonValue() {
        return jsonValue;
    }
}
