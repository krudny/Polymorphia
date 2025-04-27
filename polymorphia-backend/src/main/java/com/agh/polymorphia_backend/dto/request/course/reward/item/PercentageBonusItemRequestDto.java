package com.agh.polymorphia_backend.dto.request.course.reward.item;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.SuperBuilder;

@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Data
@EqualsAndHashCode(callSuper = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PercentageBonusItemRequestDto extends ItemRequestDto {
    @NonNull
    private Integer percentageBonus;
}
