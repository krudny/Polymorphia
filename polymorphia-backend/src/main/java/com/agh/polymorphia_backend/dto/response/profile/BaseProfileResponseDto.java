package com.agh.polymorphia_backend.dto.response.profile;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@SuperBuilder
@Data
public class BaseProfileResponseDto {
    @NotNull
    private BigDecimal totalXp;

    @NotNull
    private EvolutionStageThresholdResponseDto leftEvolutionStage;

    @NotNull
    private EvolutionStageThresholdResponseDto rightEvolutionStage;

    @NotNull
    private Long totalStudentsInCourse;
}
