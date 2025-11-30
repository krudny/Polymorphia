package com.agh.polymorphia_backend.dto.request.course_import.criterion;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CriterionRewardDetailsRequestDto {
    @NotEmpty
    private String rewardKey;

    @NotNull
    private Integer maxAmount;
}
