package com.agh.polymorphia_backend.dto.response.course.reward.item;

import com.agh.polymorphia_backend.dto.response.course.reward.item.assigned.ItemAssignmentDetailsResponseDto;
import com.agh.polymorphia_backend.dto.response.course.reward.item.base.BaseItemResponseDto;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
public class EquipmentItemResponseDto {
    @NotNull
    private BaseItemResponseDto base;

    @NotNull
    private List<ItemAssignmentDetailsResponseDto> assignmentDetails;
}
