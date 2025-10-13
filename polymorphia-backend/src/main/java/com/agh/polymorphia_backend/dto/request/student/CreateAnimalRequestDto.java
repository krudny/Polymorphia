package com.agh.polymorphia_backend.dto.request.student;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateAnimalRequestDto {
    @NotNull
    private String animalName;

    @NotNull
    private String courseId;

    @NotNull
    private Long courseGroupId;
}
