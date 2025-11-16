package com.agh.polymorphia_backend.dto.response.profile;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class StudentSummaryResponseDto {
    @NotNull
    private String studentName;

    @NotNull
    private String animalName;

    @NotNull
    private String imageUrl;

    @NotNull
    private EvolutionStageThresholdResponseDto leftEvolutionStage;

    @NotNull
    private EvolutionStageThresholdResponseDto rightEvolutionStage;

    @NotNull
    private Long totalStudentsInCourse;

    @NotNull
    private Integer position;
}
