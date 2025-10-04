package com.agh.polymorphia_backend.dto.response.equipment;

import com.agh.polymorphia_backend.dto.response.reward.BaseRewardResponseDto;
import com.agh.polymorphia_backend.dto.response.reward.assignment_details.ChestAssignmentDetailsResponseDto;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class EquipmentChestResponseDto {
    @NotNull
    private BaseRewardResponseDto base;

    @NotNull
    private ChestAssignmentDetailsResponseDto details;
}
