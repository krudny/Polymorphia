package com.agh.polymorphia_backend.dto.response.grade;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@SuperBuilder
@Getter
@JsonInclude(JsonInclude.Include.NON_EMPTY)
@EqualsAndHashCode(callSuper = true)
public class StudentGroupShortGradeResponseDto extends ShortGradeResponseDto {
    private List<Long> ids;
}
