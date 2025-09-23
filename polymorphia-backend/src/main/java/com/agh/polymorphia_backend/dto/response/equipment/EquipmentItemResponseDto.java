package com.agh.polymorphia_backend.dto.response.equipment;

import com.agh.polymorphia_backend.dto.response.reward.BaseRewardResponseDto;
import com.agh.polymorphia_backend.dto.response.reward.assignment_details.ItemAssignmentDetailsResponseDto;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

import java.util.List;


@Builder
@Data
public class EquipmentItemResponseDto {
    @NotNull
    private BaseRewardResponseDto base;

    @NotNull
    private List<ItemAssignmentDetailsResponseDto> details;
}
