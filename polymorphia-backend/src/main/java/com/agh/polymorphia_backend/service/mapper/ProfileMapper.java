package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.response.profile.EvolutionStageThresholdResponseDto;
import com.agh.polymorphia_backend.model.course.EvolutionStage;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ProfileMapper {
    private static final String EVOLUTION_STAGE_GRADING_TEXT = "%.1f (%.1fxp)";

    public EvolutionStageThresholdResponseDto toEvolutionStageThresholdResponseDto(EvolutionStage evolutionStage) {
        String gradingThreshold = String.format(EVOLUTION_STAGE_GRADING_TEXT, evolutionStage.getGrade(), evolutionStage.getMinXp());

        return EvolutionStageThresholdResponseDto.builder().id(evolutionStage.getId()).name(evolutionStage.getName()).gradingThreshold(gradingThreshold).build();
    }
}
