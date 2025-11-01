package com.agh.polymorphia_backend.service.markdown;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Getter
public enum MarkdownType {
    GRADABLE_EVENT("gradable-event"),
    COURSE_RULES("course-rules");

    private final String value;

    MarkdownType(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    @JsonCreator
    public static MarkdownType fromValue(String value) {
        for (MarkdownType type : values()) {
            if (type.value.equals(value)) {
                return type;
            }
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nie znaleziono typu Markdown.");
    }
}
