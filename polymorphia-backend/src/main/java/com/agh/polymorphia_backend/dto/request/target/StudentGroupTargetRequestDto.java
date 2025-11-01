package com.agh.polymorphia_backend.dto.request.target;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

@Builder
public record StudentGroupTargetRequestDto(Long groupId) implements TargetRequestDto {
    @Override
    @JsonProperty("type")
    public TargetType type() {
        return TargetType.STUDENT_GROUP;
    }
}
