package com.agh.polymorphia_backend.dto.response.grade;

import com.agh.polymorphia_backend.dto.response.criteria.CriterionGradeResponseDto;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@SuperBuilder
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
@EqualsAndHashCode
public class ShortGradeResponseDto {
    @NotNull
    private Boolean isGraded;

    private String comment;

    private Boolean hasReward;

    private List<CriterionGradeResponseDto> criteria;
}
