package com.agh.polymorphia_backend.dto.request.student;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateAnimalRequestDTO {
    @NotNull
    private String animalName;

    @NotNull
    private Long courseId;
}
