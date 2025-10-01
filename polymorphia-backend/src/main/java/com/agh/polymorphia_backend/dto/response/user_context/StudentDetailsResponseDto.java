package com.agh.polymorphia_backend.dto.response.user_context;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
public class StudentDetailsResponseDto extends BaseUserDetailsResponseDto {
    @NotEmpty
    private String animalName;

    @NotEmpty
    private String evolutionStage;

    @NotEmpty
    private String group;

    @NotNull
    private Integer position;
}
