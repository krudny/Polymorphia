package com.agh.polymorphia_backend.dto.response.course.reward.item.assigned;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
public class ItemAssignmentDetailsResponseDto {
    @NotNull
    private Long id;

    @NotNull
    private ZonedDateTime receivedDate;

    @PositiveOrZero
    private BigDecimal xp;

    private Integer percentage;
}
