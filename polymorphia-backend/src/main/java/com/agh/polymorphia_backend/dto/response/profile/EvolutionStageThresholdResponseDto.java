package com.agh.polymorphia_backend.dto.response.profile;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
public class EvolutionStageThresholdResponseDto {
    @NotNull
    private Long id;

    @NotEmpty
    private String name;

    @NotEmpty
    private String gradingThreshold;
}
