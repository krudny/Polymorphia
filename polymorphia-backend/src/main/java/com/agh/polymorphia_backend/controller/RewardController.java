package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.config.StaticFileServerProperties;
import com.agh.polymorphia_backend.dto.request.course.reward.ChestRequestDto;
import com.agh.polymorphia_backend.dto.request.course.reward.item.ItemRequestDto;
import com.agh.polymorphia_backend.dto.response.course.reward.item.ItemResponseDto;
import com.agh.polymorphia_backend.service.ImageStorageService;
import com.agh.polymorphia_backend.service.RewardService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/rewards")
public class RewardController {
    private final RewardService rewardService;
    private final ImageStorageService imageStorageService;

    @PostMapping(value = "/chests", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> addChest(@RequestPart("chest") ChestRequestDto chest, @RequestParam("image") MultipartFile chestImage) throws IOException {
        Long chestId = rewardService.addChest(chest, chestImage);
        return Util.getCreatedResponseEntity(chestId);
    }

    @GetMapping("/chests/{chestId}/items")
    public ResponseEntity<List<ItemResponseDto>> getChestItems(@PathVariable Long chestId) {
        return ResponseEntity.ok(rewardService.getAllChestItems(chestId));
    }

    @PostMapping("/chests/{chestId}/items")
    public ResponseEntity<Void> addChestItems(
            @PathVariable Long chestId,
            @RequestBody List<Long> itemIds) {
        rewardService.addItemsToChest(itemIds, chestId);
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/items", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> addItem(
            @RequestPart("item") ItemRequestDto item, @RequestParam("image") MultipartFile itemImage) throws IOException {
        return Util.getCreatedResponseEntity(rewardService.addItem(item, itemImage));
    }

    @GetMapping("/items/{itemId}")
    public ResponseEntity<ItemResponseDto> addItem(
            @PathVariable Long itemId) {
        return ResponseEntity.ok(rewardService.getItemById(itemId));
    }
}
