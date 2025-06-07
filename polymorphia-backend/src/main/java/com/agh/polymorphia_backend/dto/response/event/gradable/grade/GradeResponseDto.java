package com.agh.polymorphia_backend.dto.response.event.gradable.grade;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GradeResponseDto {
    @Positive
    @Digits(integer = 3, fraction = 1)
    private BigDecimal gainedXp;

    @JsonFormat(pattern="dd.MM.yyyy")
    private ZonedDateTime createdDate;

    @JsonFormat(pattern="dd.MM.yyyy")
    private ZonedDateTime modifiedDate;

    @NotNull
    private List<EventChestResponseDto> chests;
}
