package com.agh.polymorphia_backend.dto.response.user;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Builder
@Getter
public class StudentActivityResponseDto {
    @NotNull
    Long id;

    @NotNull
    String gradableEventName;

    @NotNull
    BigDecimal gainedXp;

    @NotNull
    Boolean hasReward;

    @NotNull
    String gradeDate;
}
