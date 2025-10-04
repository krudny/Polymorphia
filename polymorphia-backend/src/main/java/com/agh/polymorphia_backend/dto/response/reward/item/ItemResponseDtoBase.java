package com.agh.polymorphia_backend.dto.response.reward.item;

import com.agh.polymorphia_backend.dto.response.reward.BaseRewardResponseDto;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
public class ItemResponseDtoBase extends BaseRewardResponseDto {

    @NotNull
    private String bonusText;

    @NotNull
    private Integer limit;

    @NotNull
    private Boolean isLimitReached;

    @NotNull
    private Long eventSectionId;
}