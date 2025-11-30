package com.agh.polymorphia_backend.dto.request.course_import.criterion;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Builder
public class CriterionDetailsRequestDto {
    @NotEmpty
    private String name;

    @NotNull
    private BigDecimal maxXp;

    @NotNull
    private List<CriterionRewardDetailsRequestDto> rewards;
}
