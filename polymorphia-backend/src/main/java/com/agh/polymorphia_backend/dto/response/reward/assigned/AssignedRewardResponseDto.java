package com.agh.polymorphia_backend.dto.response.reward.assigned;

import com.agh.polymorphia_backend.dto.response.reward.BaseRewardResponseDto;
import com.agh.polymorphia_backend.dto.response.reward.assignment_details.BaseRewardAssignmentDetailsResponseDto;
import lombok.Builder;

@Builder
public record AssignedRewardResponseDto(
        BaseRewardResponseDto base,
        BaseRewardAssignmentDetailsResponseDto details
) {
}

