package com.agh.polymorphia_backend.dto.response.event.section.bonus;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
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
    private Long id;

    @NotNull
    private Long assignedItemId;

    @NotNull
    private Long assignedChestId;

    @NotNull
    private String name;

    @NotNull
    private String imageUrl;

    @NotNull
    @JsonFormat(pattern="dd.MM.yyyy")
    private ZonedDateTime receivedDate;

    @NotNull
    @Positive
    @Digits(integer = 3, fraction = 1)
    private BigDecimal xp;
}
