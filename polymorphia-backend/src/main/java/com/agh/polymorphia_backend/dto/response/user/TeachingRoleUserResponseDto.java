package com.agh.polymorphia_backend.dto.response.user;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TeachingRoleUserResponseDto {
    @NotNull
    private Long userId;

    @NotNull
    private String fullName;
}