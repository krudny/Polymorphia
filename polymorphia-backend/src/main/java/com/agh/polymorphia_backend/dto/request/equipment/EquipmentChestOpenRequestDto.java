package com.agh.polymorphia_backend.dto.request.equipment;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class EquipmentChestOpenRequestDto {
    Long itemId;
    @NotNull
    private Long assignedChestId;
}
