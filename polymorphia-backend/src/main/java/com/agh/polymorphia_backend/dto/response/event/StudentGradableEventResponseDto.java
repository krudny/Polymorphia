package com.agh.polymorphia_backend.dto.response.event;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;
import org.springframework.lang.Nullable;

@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@Data
public class StudentGradableEventResponseDto extends BaseGradableEventResponseDto {
    @Nullable
    private String gainedXp;

    @NotNull
    private boolean hasPossibleReward;

    @NotNull
    @JsonProperty("isGraded")
    private boolean isGraded;

    @NotNull
    @JsonProperty("isRewardAssigned")
    private boolean isRewardAssigned;
}
