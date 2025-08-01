package com.agh.polymorphia_backend.dto.response.course.reward.item.assigned;

import com.agh.polymorphia_backend.dto.response.course.reward.item.base.BaseItemResponseDto;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class AssignedItemResponseDto {
    @NotNull
    private BaseItemResponseDto item;

    @NotNull
    private ItemAssignmentDetailsResponseDto assignmentDetails;

}
