package com.agh.polymorphia_backend.dto.response.profile;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Data
public class BaseProfileResponseDto {
    @NotNull
    private EvolutionStageThresholdResponseDto leftEvolutionStage;

    @NotNull
    private EvolutionStageThresholdResponseDto rightEvolutionStage;

    @NotNull
    private Long totalStudentsInCourse;
}
