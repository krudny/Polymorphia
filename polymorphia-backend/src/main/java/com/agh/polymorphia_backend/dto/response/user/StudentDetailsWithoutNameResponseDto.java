package com.agh.polymorphia_backend.dto.response.user;

public record StudentDetailsWithoutNameResponseDto(
        String animalName,
        String evolutionStage,
        String group,
        String imageUrl,
        int position
) implements StudentDetailsResponseDto{ }
