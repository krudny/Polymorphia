package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.response.profile.EvolutionStageThresholdResponseDto;
import com.agh.polymorphia_backend.model.user.student.EvolutionStage;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ProfileMapper {
    public EvolutionStageThresholdResponseDto toEvolutionStageThresholdResponseDto(EvolutionStage evolutionStage) {
        return EvolutionStageThresholdResponseDto.builder()
                .id(evolutionStage.getId())
                .name(evolutionStage.getName())
                .grade(evolutionStage.getGrade())
                .minXp(evolutionStage.getMinXp())
                .build();
    }
}
