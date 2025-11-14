package com.agh.polymorphia_backend.dto.response.event;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@Data
public class StudentGradableEventResponseDto extends BaseGradableEventResponseDto {
    private String gainedXp;

    @NotNull
    private boolean hasPossibleReward;

    @NotNull
    private boolean isGraded;

    @NotNull
    private boolean isRewardAssigned;
}
