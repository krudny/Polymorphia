package com.agh.polymorphia_backend.dto.request.course.reward.item;

import com.agh.polymorphia_backend.model.course.reward.item.FlatBonusItemBehavior;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@NoArgsConstructor
@SuperBuilder
@Data
@EqualsAndHashCode(callSuper = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class FlatBonusRequestItemRequestDto extends ItemRequestDto {
    @NotNull
    @Positive
    private Integer xpBonus;

    @NotNull
    private FlatBonusItemBehavior behavior;

}
