package com.agh.polymorphia_backend.dto.response.grade;

import com.agh.polymorphia_backend.dto.response.criteria.CriterionGradeResponseDto;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ShortGradeResponseDto {
    @NotNull
    private Boolean isGraded;

    private Long id;

    private String comment;

    private List<CriterionGradeResponseDto> criteria;
}
