package com.agh.polymorphia_backend.dto.response.reward.assigned;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@Builder
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
@EqualsAndHashCode
public class ShortAssignedRewardResponseDto {
    @NotNull
    private Long rewardId;

    @NotNull
    private String name;

    @NotNull
    private String imageUrl;

    @NotNull
    private Integer quantity;
}
