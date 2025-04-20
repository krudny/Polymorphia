package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.ChestDto;
import com.agh.polymorphia_backend.dto.item.ItemDto;
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
    public ResponseEntity<Void> addChest(@RequestBody ChestDto chest) {
        Long chestId = courseService.addChest(chest);
        return Util.getCreatedResponseEntity(chestId);
    }

    @GetMapping("/chests/{chestId}/items")
    public ResponseEntity<List<ItemDto>> getChestItems(@PathVariable Long chestId) {
        return ResponseEntity.ok(courseService.getAllChestItems(chestId));
    }

    @PostMapping("/chests/{chestId}/items")
    public ResponseEntity<Void> addChestItems(
            @PathVariable Long chestId,
            @RequestBody List<Long> items) {
        courseService.addItemsToChest(items, chestId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/items")
    public ResponseEntity<Void> addItem(
            @RequestBody ItemDto item) {
        return Util.getCreatedResponseEntity(courseService.addItem(item));
    }

    @GetMapping("/items/{itemId}")
    public ResponseEntity<ItemDto> addItem(
            @PathVariable Long itemId) {
        return ResponseEntity.ok(courseService.getItemById(itemId));
    }
}
