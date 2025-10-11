package com.agh.polymorphia_backend.dto.response.reward;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

@SuperBuilder(toBuilder = true)
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BaseRewardResponseDto {
    @NotNull
    private Long id;

    @NotEmpty
    private String name;

    @NotEmpty
    private String imageUrl;

    @NotEmpty
    private Long orderIndex;
}
