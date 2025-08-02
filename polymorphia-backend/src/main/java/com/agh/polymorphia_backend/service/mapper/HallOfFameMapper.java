package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.response.user.StudentDetailsResponseDto;
import com.agh.polymorphia_backend.model.HallOfFame;
import org.springframework.stereotype.Service;

@Service
public class HallOfFameMapper {
    public StudentDetailsResponseDto toResponseDto(HallOfFame hallOfFame) {
        return StudentDetailsResponseDto.builder()
                .animalName(hallOfFame.getAnimal().getName())
                .group(hallOfFame.getAnimal().getCourseGroup().getName())
                .evolutionStage(null)
                .imageUrl(null)
                .position(0)
                .build();
    }

}
