package com.agh.polymorphia_backend.dto.response.grade;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AssignedChestResponseDto {
    @NotNull
    private Long chestId;

    @NotNull
    private String name;

    @NotNull
    private Boolean opened;
}
