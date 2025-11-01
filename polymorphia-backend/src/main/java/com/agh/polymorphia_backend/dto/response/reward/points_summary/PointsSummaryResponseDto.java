package com.agh.polymorphia_backend.dto.response.reward.points_summary;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PointsSummaryResponseDto {
    @NotNull
    private PointsSummaryDetailsResponseDto gained;

    @NotNull
    private PointsSummaryDetailsResponseDto flatBonus;

    @NotNull
    private PointsSummaryDetailsResponseDto percentageBonus;

    @NotNull
    private PointsSummaryDetailsResponseDto total;
}
