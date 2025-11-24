package com.agh.polymorphia_backend.dto.response.reward.points_summary;

import com.agh.polymorphia_backend.dto.response.reward.assigned.AssignedRewardResponseDto;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;

@Builder
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PointsSummaryDetailsResponseDto {
    @NotNull
    private String title;

    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private BigDecimal gainedXp;

    private List<AssignedRewardResponseDto> assignedItems;
}
