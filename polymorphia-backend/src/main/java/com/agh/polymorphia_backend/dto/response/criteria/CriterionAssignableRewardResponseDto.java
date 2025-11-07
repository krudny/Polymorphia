package com.agh.polymorphia_backend.dto.response.criteria;

import com.agh.polymorphia_backend.dto.response.reward.BaseRewardResponseDtoWithType;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CriterionAssignableRewardResponseDto {
    @NotNull
    private Integer maxAmount;

    @NotNull
    private BaseRewardResponseDtoWithType assignableReward;
}
