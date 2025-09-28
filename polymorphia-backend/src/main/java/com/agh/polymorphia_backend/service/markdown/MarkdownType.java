package com.agh.polymorphia_backend.service.markdown;

import lombok.Getter;

@Getter
public enum MarkdownType {
    GRADABLE_EVENT("gradable_event"),
    COURSE_RULES("course_rules");

    private final String value;

    MarkdownType(String value) {
        this.value = value;
    }
}
