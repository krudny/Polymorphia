package com.agh.polymorphia_backend.dto.response.criteria;


import com.agh.polymorphia_backend.dto.response.reward.assigned.ShortAssignedRewardResponseDto;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;

@Builder
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CriterionGradeResponseDto {
    @NotNull
    private Long criterionId;

    private BigDecimal gainedXp;

    @NotNull
    private List<ShortAssignedRewardResponseDto> assignedRewards;
}
