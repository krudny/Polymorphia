package com.agh.polymorphia_backend.dto.request.course_import.reward;

import jakarta.validation.constraints.NotNull;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
public class PercentageBonusItemDetailsRequestDto extends ItemDetailsRequestDto {
    @NotNull
    private Integer percentageBonus;
}
