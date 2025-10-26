package com.agh.polymorphia_backend.dto.response.reward.item;

import com.agh.polymorphia_backend.dto.response.reward.BaseRewardResponseDto;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@SuperBuilder(toBuilder = true)
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ItemResponseDtoBase extends BaseRewardResponseDto {

    @NotNull
    private String bonusText;

    @NotNull
    private String shortBonusText;

    @NotNull
    private Integer limit;

    @NotNull
    @Setter
    private Boolean isLimitReached;

    @NotNull
    private Long eventSectionId;

    @Digits(integer = 3, fraction = 1)
    @PositiveOrZero
    private BigDecimal potentialXp;
}