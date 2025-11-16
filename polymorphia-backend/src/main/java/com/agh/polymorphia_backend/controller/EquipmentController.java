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
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/equipment")
public class EquipmentController {
    private final EquipmentService equipmentService;

    @GetMapping("/items")
    @PreAuthorize("hasAnyAuthority('STUDENT','INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<List<EquipmentItemResponseDto>> getEquipmentItems(@RequestParam Long courseId, @RequestParam Optional<Long> studentId) {
        // if studentId is present, the request is validated for instructor/coordinator access
        return ResponseEntity.ok(equipmentService.getEquipmentItems(courseId, studentId));
    }

    @GetMapping("/chests")
    @PreAuthorize("hasAnyAuthority('STUDENT', 'INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<List<EquipmentChestResponseDto>> getEquipmentChests(@RequestParam Long courseId, @RequestParam Optional<Long> studentId) {
        // if studentId is present, the request is validated for instructor/coordinator access
        return ResponseEntity.ok(equipmentService.getEquipmentChests(courseId, studentId));
    }

    @PostMapping("/chests/open")
    @PreAuthorize("hasAnyAuthority('STUDENT', 'INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<Void> openChest(@RequestParam Long courseId, @RequestBody EquipmentChestOpenRequestDto requestDto) {
        equipmentService.openChest(courseId, requestDto);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/chests/potential-xp")
    @PreAuthorize("hasAnyAuthority('STUDENT', 'INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<ChestPotentialXpResponseDtoWithType> getPotentialXp(@RequestParam Long courseId, @RequestParam Long assignedChestId) {
        return ResponseEntity.ok(equipmentService.getPotentialXpForChest(courseId, assignedChestId));
    }
}
