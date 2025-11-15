package com.agh.polymorphia_backend.dto.response.project;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ProjectVariantResponseDto {
    @NotNull
    private Long id;

    @NotEmpty
    private String name;

    @NotEmpty
    private String categoryName;

    @NotEmpty
    private String shortCode;

    @NotEmpty
    private String imageUrl;
}
