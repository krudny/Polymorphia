package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.request.equipment.EquipmentChestOpenRequestDto;
import com.agh.polymorphia_backend.dto.response.equipment.EquipmentChestResponseDto;
import com.agh.polymorphia_backend.dto.response.equipment.EquipmentItemResponseDto;
import com.agh.polymorphia_backend.dto.response.equipment.potential_xp.ChestPotentialXpResponseDtoWithType;
import com.agh.polymorphia_backend.service.EquipmentService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/equipment")
public class EquipmentController {
    private final EquipmentService equipmentService;

    @GetMapping("/items")
    @PreAuthorize("hasAnyAuthority('STUDENT')")
    public ResponseEntity<List<EquipmentItemResponseDto>> getEquipmentItems(@RequestParam Long courseId) {
        return ResponseEntity.ok(equipmentService.getEquipmentItems(courseId));
    }

    @GetMapping("/chests")
    @PreAuthorize("hasAnyAuthority('STUDENT')")
    public ResponseEntity<List<EquipmentChestResponseDto>> getEquipmentChests(@RequestParam Long courseId) {
        return ResponseEntity.ok(equipmentService.getEquipmentChests(courseId));
    }

    @PostMapping("/chests/open")
    @PreAuthorize("hasAnyAuthority('STUDENT')")
    public ResponseEntity<Void> openChest(@RequestParam Long courseId, @RequestBody EquipmentChestOpenRequestDto requestDto) {
        equipmentService.openChest(courseId, requestDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/chests/potential-xp")
    @PreAuthorize("hasAnyAuthority('STUDENT')")
    public ResponseEntity<ChestPotentialXpResponseDtoWithType> getPotentialXp(@RequestParam Long courseId, @RequestParam Long assignedChestId) {
        return ResponseEntity.ok(equipmentService.getPotentialXpForChest(courseId, assignedChestId));
    }
}
