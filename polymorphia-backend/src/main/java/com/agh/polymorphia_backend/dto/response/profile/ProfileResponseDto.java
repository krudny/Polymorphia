package com.agh.polymorphia_backend.dto.response.profile;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@Data
public class ProfileResponseDto extends BaseProfileResponseDto {
    @NotNull
    private Map<String, String> xpDetails;

    @NotNull
    private List<EvolutionStageThresholdResponseDto> evolutionStageThresholds;
}
