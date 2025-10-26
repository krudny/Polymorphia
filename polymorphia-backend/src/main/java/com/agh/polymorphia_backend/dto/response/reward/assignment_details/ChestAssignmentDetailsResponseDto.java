package com.agh.polymorphia_backend.dto.response.reward.assignment_details;

import com.agh.polymorphia_backend.dto.response.reward.assigned.AssignedRewardResponseDto;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@SuperBuilder
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ChestAssignmentDetailsResponseDto extends BaseRewardAssignmentDetailsResponseDto {
    private List<AssignedRewardResponseDto> receivedItems;
}
