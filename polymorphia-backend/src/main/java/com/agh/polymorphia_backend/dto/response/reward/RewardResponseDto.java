package com.agh.polymorphia_backend.dto.response.reward;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
public class RewardResponseDto {
    @NotNull
    private String id;

    @NotEmpty
    private String name;

    @NotEmpty
    private String imageUrl;

    @NotEmpty
    private Long orderIndex;
}
