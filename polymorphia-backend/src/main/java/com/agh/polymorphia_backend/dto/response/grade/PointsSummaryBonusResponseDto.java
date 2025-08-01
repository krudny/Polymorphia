package com.agh.polymorphia_backend.dto.response.grade;

import com.agh.polymorphia_backend.dto.response.course.reward.item.assigned.AssignedItemResponseDto;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PointsSummaryBonusResponseDto {
    @NotNull
    @PositiveOrZero
    @Digits(integer = 3, fraction = 1)
    private BigDecimal xp;

    private Integer percentage;

    @NotNull
    private List<AssignedItemResponseDto> assignedItems;
}
