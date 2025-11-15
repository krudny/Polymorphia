package com.agh.polymorphia_backend.dto.response.grade;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
@EqualsAndHashCode(callSuper = true)
public class StudentShortGradeResponseDto extends ShortGradeResponseDto {
    private Long id;
}
