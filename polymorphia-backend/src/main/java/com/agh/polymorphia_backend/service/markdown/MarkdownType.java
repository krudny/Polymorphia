package com.agh.polymorphia_backend.service.markdown;

import lombok.Getter;

@Getter
public enum MarkdownType {
    GRADABLE_EVENT("GRADABLE_EVENT"),
    COURSE_RULES("COURSE_RULES");

    private final String value;

    MarkdownType(String value) {
        this.value = value;
    }
}
