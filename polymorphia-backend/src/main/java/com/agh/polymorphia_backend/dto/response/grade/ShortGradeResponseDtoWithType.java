package com.agh.polymorphia_backend.dto.response.grade;

import com.agh.polymorphia_backend.dto.request.grade.target.TargetType;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
@EqualsAndHashCode
public class ShortGradeResponseDtoWithType {
    @NotNull
    private TargetType targetType;

    @NotNull
    private ShortGradeResponseDto gradeResponse;

}
