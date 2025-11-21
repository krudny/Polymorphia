package com.agh.polymorphia_backend.dto.response.user;

public record StudentDetailsWithNameResponseDto(
        String fullName,
        String animalName,
        String evolutionStage,
        String group,
        String imageUrl,
        int position
) implements StudentDetailsResponseDto {

    public StudentDetailsWithNameResponseDto(String fullName, StudentDetailsWithoutNameResponseDto studentDetails) {
        this(
                fullName,
                studentDetails.animalName(),
                studentDetails.evolutionStage(),
                studentDetails.group(),
                studentDetails.imageUrl(),
                studentDetails.position()
        );
    }
}
