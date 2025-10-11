package com.agh.polymorphia_backend.dto.response.reward.chest;

import com.agh.polymorphia_backend.dto.response.reward.BaseRewardResponseDto;
import com.agh.polymorphia_backend.model.course.reward.chest.ChestBehavior;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.List;

@SuperBuilder
@Getter
@Setter
public class ChestResponseDtoBase extends BaseRewardResponseDto {
    @NotEmpty
    private String behaviorText;

    @NotNull
    private ChestBehavior behavior;

    private BigDecimal potentialXp;

    @NotNull
    private List<BaseRewardResponseDto> chestItems;
}
