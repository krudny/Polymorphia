package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.response.course.EvolutionStageResponseDto;
import com.agh.polymorphia_backend.model.course.EvolutionStage;
import org.springframework.stereotype.Service;

@Service
public class EvolutionStagesMapper {
    private static final String EVOLUTION_STAGES_GRADING_TEXT = "%dxp odblokowuje ocenę %.1f";

    public EvolutionStageResponseDto evolutionStageToEvolutionStageResponseDto(EvolutionStage evolutionStage) {
        return EvolutionStageResponseDto.builder()
                .id(evolutionStage.getId())
                .name(evolutionStage.getName())
                .grade(evolutionStage.getGrade())
                .minXp(evolutionStage.getMinXp())
                .imageUrl(evolutionStage.getImageUrl())
                .courseId(evolutionStage.getCourse().getId())
                .gradingText(String.format(EVOLUTION_STAGES_GRADING_TEXT, evolutionStage.getMinXp(), evolutionStage.getGrade()))
                .description(evolutionStage.getDescription())
                .build();
    }
}
