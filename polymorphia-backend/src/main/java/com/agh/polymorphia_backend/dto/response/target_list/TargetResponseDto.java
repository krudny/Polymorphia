package com.agh.polymorphia_backend.dto.response.target_list;

import com.agh.polymorphia_backend.dto.request.target.TargetType;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.EXISTING_PROPERTY,
        property = "type",
        visible = true
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = StudentTargetResponseDto.class, name = "STUDENT"),
        @JsonSubTypes.Type(value = StudentGroupTargetResponseDto.class, name = "STUDENT_GROUP")
})
public sealed interface TargetResponseDto permits StudentTargetResponseDto, StudentGroupTargetResponseDto {
    TargetType type();
}
