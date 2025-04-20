package com.agh.polymorphia_backend.dto.item;

import com.agh.polymorphia_backend.model.course.reward.item.FlatBonusItemBehavior;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.SuperBuilder;

@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Data
@EqualsAndHashCode(callSuper = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class FlatBonusItemDto extends ItemDto {
    @NonNull
    private Integer xpBonus;

    @NonNull
    private FlatBonusItemBehavior behavior;

}
