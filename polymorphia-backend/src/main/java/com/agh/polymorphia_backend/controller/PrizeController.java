package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.ChestDto;
import com.agh.polymorphia_backend.dto.ItemDto;
import com.agh.polymorphia_backend.service.CourseService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/prize")
public class PrizeController {
    private final CourseService courseService;

    @PostMapping("/chests/add")
    public ResponseEntity<Void> addChest(@RequestBody ChestDto chest) {
        courseService.addChest(chest);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/chests/items")
    public ResponseEntity<List<ItemDto>> getChestItems(@RequestParam Long chestId) {
        return ResponseEntity.ok(courseService.getAllChestItems(chestId));
    }

    @PostMapping("/chests/items/add")
    public ResponseEntity<Void> addChestItems(@RequestBody List<ItemDto> items) {
        courseService.addItemsToChests(items);
        return ResponseEntity.ok().build();
    }
}
