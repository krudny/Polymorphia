package com.agh.polymorphia_backend.dto.response.criteria;


import com.agh.polymorphia_backend.dto.response.reward.assigned.ShortAssignedRewardResponseDto;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Builder
@Getter
@EqualsAndHashCode
public class CriterionGradeResponseDto {
    @NotNull
    private Long criterionId;

    private BigDecimal gainedXp;

    @NotNull
    @Builder.Default
    private List<ShortAssignedRewardResponseDto> assignedRewards = new ArrayList<>();
}
