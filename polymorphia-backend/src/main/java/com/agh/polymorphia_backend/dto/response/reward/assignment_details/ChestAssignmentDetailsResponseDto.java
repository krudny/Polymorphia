package com.agh.polymorphia_backend.dto.response.reward.assignment_details;

import com.agh.polymorphia_backend.dto.response.reward.assigned.AssignedRewardResponseDto;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@SuperBuilder
@Getter
public class ChestAssignmentDetailsResponseDto extends BaseRewardAssignmentDetailsResponseDto {
    private List<AssignedRewardResponseDto> receivedItems;
}
