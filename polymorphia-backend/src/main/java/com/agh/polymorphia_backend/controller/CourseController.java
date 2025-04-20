package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.ChestDto;
import com.agh.polymorphia_backend.dto.EvolutionStageDto;
import com.agh.polymorphia_backend.dto.item.ItemDto;
import com.agh.polymorphia_backend.service.CourseService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/courses")
public class CourseController {
    private final CourseService courseService;


    @GetMapping("/{courseId}/evolution-stages")
    public ResponseEntity<List<EvolutionStageDto>> getEvolutionStages(@PathVariable Long courseId) {
        return ResponseEntity.ok(courseService.getEvolutionStages(courseId));
    }

    @GetMapping("/{courseId}/chests")
    public ResponseEntity<List<ChestDto>> getChests(@PathVariable Long courseId) {
        return ResponseEntity.ok(courseService.getAllChests(courseId));
    }

    @GetMapping("/{courseId}/items")
    public ResponseEntity<List<ItemDto>> getItems(@PathVariable Integer courseId) {
        List<ItemDto> itemDtos = courseService.getAllCourseItems(courseId);
        return ResponseEntity.ok(itemDtos);
    }

}
