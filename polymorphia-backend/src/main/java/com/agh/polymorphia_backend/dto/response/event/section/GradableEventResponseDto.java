package com.agh.polymorphia_backend.dto.response.event.section;

import com.agh.polymorphia_backend.model.event.section.EventSectionType;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@SuperBuilder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class GradableEventResponseDto {
    @NotNull
    private Long id;

    @NotNull
    private EventSectionType type;

    @NotEmpty
    private String name;

    private String topic;

    @NotNull
    @PositiveOrZero
    @Digits(integer = 3, fraction = 1)
    private BigDecimal gainedXp;

    @NotNull
    private Long orderIndex;
}
