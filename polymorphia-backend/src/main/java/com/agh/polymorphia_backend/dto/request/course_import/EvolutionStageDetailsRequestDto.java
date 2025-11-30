package com.agh.polymorphia_backend.dto.request.course_import;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@Builder
public class EvolutionStageDetailsRequestDto {
    @NotEmpty
    private String key;

    @NotEmpty
    private String name;

    @NotEmpty
    private String description;

    @NotNull
    private BigDecimal minXp;

    @NotNull
    private BigDecimal grade;

    @NotNull
    private String imageUrl;
}
