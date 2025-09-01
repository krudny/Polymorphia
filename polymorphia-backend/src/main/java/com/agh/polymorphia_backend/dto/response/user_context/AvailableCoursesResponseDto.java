package com.agh.polymorphia_backend.dto.response.user_context;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class AvailableCoursesResponseDto {
    @NotNull
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String coordinator;

    @NotNull
    private String imageUrl;

    @NotNull
    private String userRole;
}
