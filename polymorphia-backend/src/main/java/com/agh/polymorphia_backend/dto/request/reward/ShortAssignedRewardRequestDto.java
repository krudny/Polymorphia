package com.agh.polymorphia_backend.dto.request.reward;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@Builder
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
@EqualsAndHashCode
public class ShortAssignedRewardRequestDto {
    @NotNull
    private Long rewardId;

    @NotNull
    private Integer quantity;
}
