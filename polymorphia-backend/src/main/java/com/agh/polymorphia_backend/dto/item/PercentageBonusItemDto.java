package com.agh.polymorphia_backend.dto.item;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.SuperBuilder;

@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Data
@EqualsAndHashCode(callSuper = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PercentageBonusItemDto extends ItemDto {
    @NonNull
    private Integer percentageBonus;
}
