package com.agh.polymorphia_backend.dto.response.target_list;

import com.agh.polymorphia_backend.dto.request.target.TargetType;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record StudentGroupTargetResponseDto(
        Long groupId,
        GroupTargetType groupType,
        List<StudentTargetDataResponseDto> members
) implements TargetResponseDto {
    @Override
    @JsonProperty("type")
    public TargetType type() {
        return TargetType.STUDENT_GROUP;
    }
}
