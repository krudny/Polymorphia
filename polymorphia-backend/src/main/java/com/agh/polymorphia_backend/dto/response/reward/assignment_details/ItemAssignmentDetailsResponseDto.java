package com.agh.polymorphia_backend.dto.response.reward.assignment_details;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
public class ItemAssignmentDetailsResponseDto extends BaseRewardAssignmentDetailsResponseDto {
    private String gainedXp;
}
