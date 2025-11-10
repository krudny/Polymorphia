package com.agh.polymorphia_backend.dto.request.target;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record StudentGroupTargetRequestDto(@NotNull Long groupId) implements TargetRequestDto {
    @Override
    @JsonProperty("type")
    public TargetType type() {
        return TargetType.STUDENT_GROUP;
    }
}
