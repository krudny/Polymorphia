package com.agh.polymorphia_backend.dto.response.reward.item;

import com.agh.polymorphia_backend.dto.response.reward.RewardResponseDto;
import jakarta.validation.constraints.NotNull;
import lombok.experimental.SuperBuilder;

@SuperBuilder
public class ItemResponseDto extends RewardResponseDto {

    @NotNull
    private String bonusText;

    @NotNull
    private Long limit;

    @NotNull
    private Boolean isLimitReached;

    @NotNull
    private Long eventSectionId;
}