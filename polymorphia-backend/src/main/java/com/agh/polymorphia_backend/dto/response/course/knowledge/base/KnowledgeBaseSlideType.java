package com.agh.polymorphia_backend.dto.response.course.knowledge.base;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum KnowledgeBaseSlideType {
    EVOLUTION_STAGE("evolution-stage"),
    ITEM("item"),
    CHEST("chest");

    private final String textValue;
}
