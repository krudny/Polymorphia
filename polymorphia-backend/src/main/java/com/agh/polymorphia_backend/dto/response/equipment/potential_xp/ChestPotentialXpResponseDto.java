package com.agh.polymorphia_backend.dto.response.equipment.potential_xp;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ChestPotentialXpResponseDto {
    private PotentialBonusXpResponseDto summary;

    @NotNull
    private Map<String, PotentialBonusXpResponseDto> itemDetails;
}
