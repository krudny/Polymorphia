package com.agh.polymorphia_backend.dto.response.equipment.potential_xp;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PotentialBonusXpResponseDto {
    @NotNull
    @JsonSerialize(using = ToStringSerializer.class)
    private BigDecimal bonusXp;

    @JsonSerialize(using = ToStringSerializer.class)
    private BigDecimal lossXp;

    @JsonSerialize(using = ToStringSerializer.class)
    private BigDecimal totalBonusXp;

}
