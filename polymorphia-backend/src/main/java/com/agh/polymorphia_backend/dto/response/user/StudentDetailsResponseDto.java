package com.agh.polymorphia_backend.dto.response.user;

import lombok.Builder;

@Builder
public record StudentDetailsResponseDto(
        String studentName,
        String animalName,
        String evolutionStage,
        String group,
        String imageUrl,
        int position
) {
}
