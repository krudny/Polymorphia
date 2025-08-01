package com.agh.polymorphia_backend.dto.response.event.section.bonus.item;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

@SuperBuilder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class BonusItemDto {
    @NotNull
    private Long assignedId;

    @NotNull
    private Long itemId;

    @NotNull
    private String name;

    @NotNull
    private String imageUrl;

    @NotNull
    @JsonFormat(pattern="dd.MM.yyyy")
    private ZonedDateTime receivedDate;

    @NotNull
    @PositiveOrZero
    @Digits(integer = 3, fraction = 1)
    private BigDecimal bonusXp;
}
