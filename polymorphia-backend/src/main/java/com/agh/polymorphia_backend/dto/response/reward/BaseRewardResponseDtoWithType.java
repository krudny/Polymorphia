package com.agh.polymorphia_backend.dto.response.reward;

import com.agh.polymorphia_backend.model.reward.RewardType;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class BaseRewardResponseDtoWithType {
    @NotNull
    private RewardType rewardType;

    @NotNull
    private BaseRewardResponseDto reward;
}
