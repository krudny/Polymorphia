package com.agh.polymorphia_backend.dto.request.grade.target;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;


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
@Getter
public class TargetRequestDto {
    @NotNull
    private TargetType type;
}
