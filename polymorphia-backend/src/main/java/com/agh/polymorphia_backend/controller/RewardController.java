package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.request.course.reward.ChestRequestDto;
import com.agh.polymorphia_backend.dto.request.course.reward.item.ItemRequestDto;
import com.agh.polymorphia_backend.dto.response.course.reward.item.ItemResponseDto;
import com.agh.polymorphia_backend.service.CourseService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/rewards")
public class RewardController {
    private final CourseService courseService;

    @PostMapping("/chests")
    public ResponseEntity<Void> addChest(@RequestBody ChestRequestDto chest) {
        Long chestId = courseService.addChest(chest);
        return Util.getCreatedResponseEntity(chestId);
    }

    @GetMapping("/chests/{chestId}/items")
    public ResponseEntity<List<ItemResponseDto>> getChestItems(@PathVariable Long chestId) {
        return ResponseEntity.ok(courseService.getAllChestItems(chestId));
    }

    @PostMapping("/chests/{chestId}/items")
    public ResponseEntity<Void> addChestItems(
            @PathVariable Long chestId,
            @RequestBody List<Long> itemIds) {
        courseService.addItemsToChest(itemIds, chestId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/items")
    public ResponseEntity<Void> addItem(
            @RequestBody ItemRequestDto item) {
        return Util.getCreatedResponseEntity(courseService.addItem(item));
    }

    @GetMapping("/items/{itemId}")
    public ResponseEntity<ItemResponseDto> addItem(
            @PathVariable Long itemId) {
        return ResponseEntity.ok(courseService.getItemById(itemId));
    }
}
