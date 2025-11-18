package com.agh.polymorphia_backend.dto.response.target_list;

import com.agh.polymorphia_backend.dto.request.target.TargetType;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

@Builder
public record StudentTargetResponseDto(
        Long id,
        StudentTargetDataResponseDto student
) implements TargetResponseDto {

    @Override
    @JsonProperty("type")
    public TargetType type() {
        return TargetType.STUDENT;
    }
}
