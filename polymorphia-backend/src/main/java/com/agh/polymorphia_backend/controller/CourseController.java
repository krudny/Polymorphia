package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.ChestDto;
import com.agh.polymorphia_backend.dto.EvolutionStageDto;
import com.agh.polymorphia_backend.dto.ItemDto;
import com.agh.polymorphia_backend.service.CourseService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/course")
public class CourseController {
    private final CourseService courseService;


    @GetMapping("/evolution-stages")
    public ResponseEntity<List<EvolutionStageDto>> getEvolutionStages(@RequestParam Long courseId) {
        return ResponseEntity.ok(courseService.getEvolutionStages(courseId));
    }

    @GetMapping("/chests")
    public ResponseEntity<List<ChestDto>> getChests(@RequestParam Long courseId) {
        return ResponseEntity.ok(courseService.getAllChests(courseId));
    }

    @GetMapping("/items")
    public ResponseEntity<List<ItemDto>> getItems(@RequestParam(required = false) Integer courseId) {
        List<ItemDto> itemDtos = courseService.getAllCourseItems(courseId);
        return ResponseEntity.ok(itemDtos);
    }

}
