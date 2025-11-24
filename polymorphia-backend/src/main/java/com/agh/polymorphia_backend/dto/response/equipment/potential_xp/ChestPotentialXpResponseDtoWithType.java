package com.agh.polymorphia_backend.dto.response.equipment.potential_xp;

import com.agh.polymorphia_backend.model.reward.chest.ChestBehavior;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ChestPotentialXpResponseDtoWithType {
    @NotNull
    private ChestBehavior behavior;

    @NotNull
    private ChestPotentialXpResponseDto potentialXp;
}