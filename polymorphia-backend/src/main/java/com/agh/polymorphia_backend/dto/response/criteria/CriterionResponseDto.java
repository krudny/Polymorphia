package com.agh.polymorphia_backend.dto.response.criteria;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class CriterionResponseDto {
    @NotNull
    private Long id;

    @NotEmpty
    private String name;

    @NotEmpty
    private String maxXp;

    @NotNull
    private List<CriterionAssignableRewardResponseDto> assignableRewards;
}
