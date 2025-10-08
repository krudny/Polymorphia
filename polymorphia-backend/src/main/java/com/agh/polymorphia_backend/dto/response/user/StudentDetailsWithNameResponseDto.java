package com.agh.polymorphia_backend.dto.response.user;

public record StudentDetailsWithNameResponseDto(
        String studentName,
        String animalName,
        String evolutionStage,
        String group,
        String imageUrl,
        int position
) implements StudentDetailsResponseDto {

    public StudentDetailsWithNameResponseDto(String studentName, StudentDetailsWithoutNameResponseDto studentDetails) {
        this(
                studentName,
                studentDetails.animalName(),
                studentDetails.evolutionStage(),
                studentDetails.group(),
                studentDetails.imageUrl(),
                studentDetails.position()
        );
    }
}
