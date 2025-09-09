package com.agh.polymorphia_backend.dto.response.profile;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Builder
@Getter
public class ProfileResponseDto {
    @NotNull
    private Map<String, String> xpDetails;

    @NotNull
    private List<EvolutionStageThresholdResponseDto> evolutionStageThresholds;

    @NotNull
    private Long totalStudentsInCourse;

    @NotNull
    private BigDecimal totalXp;
}
