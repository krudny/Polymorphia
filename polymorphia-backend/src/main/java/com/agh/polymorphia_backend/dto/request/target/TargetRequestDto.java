package com.agh.polymorphia_backend.dto.request.target;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.Builder;

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.EXISTING_PROPERTY,
        property = "type",
        visible = true
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = StudentTargetRequestDto.class, name = "STUDENT"),
        @JsonSubTypes.Type(value = StudentGroupTargetRequestDto.class, name = "STUDENT_GROUP")
})
public sealed interface TargetRequestDto permits StudentTargetRequestDto, StudentGroupTargetRequestDto {
    TargetType type();
}
