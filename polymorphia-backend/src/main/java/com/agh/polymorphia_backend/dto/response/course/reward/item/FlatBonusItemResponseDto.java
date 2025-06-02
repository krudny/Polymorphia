package com.agh.polymorphia_backend.dto.response.course.reward.item;

import com.agh.polymorphia_backend.model.course.reward.item.FlatBonusItemBehavior;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@NoArgsConstructor
@SuperBuilder
@Data
@EqualsAndHashCode(callSuper = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class FlatBonusItemResponseDto extends ItemResponseDto {
    @NotNull
    private Float xpBonus;
    @NotNull
    private FlatBonusItemBehavior behavior;
}
