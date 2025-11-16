package com.agh.polymorphia_backend.dto.response.event;

import com.fasterxml.jackson.annotation.JsonProperty;
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
    private boolean hasReward;

    @NotNull
    @JsonProperty("isLocked")
    private boolean isLocked;
}
