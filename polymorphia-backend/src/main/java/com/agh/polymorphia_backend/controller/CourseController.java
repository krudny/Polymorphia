package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.response.course.EvolutionStageResponseDto;
import com.agh.polymorphia_backend.dto.response.course.reward.ChestResponseDto;
import com.agh.polymorphia_backend.dto.response.course.reward.item.ItemResponseDto;
import com.agh.polymorphia_backend.dto.response.event.section.EventSectionShortResponseDto;
import com.agh.polymorphia_backend.service.course.CourseService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @GetMapping("/{courseId}/event-sections")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<EventSectionShortResponseDto>> getAllCourseEventSections(@PathVariable Long courseId) {
        return ResponseEntity.ok(courseService.getAllCourseEvents(courseId));
    }

    @GetMapping("/{courseId}/evolution-stages")
    public ResponseEntity<List<EvolutionStageResponseDto>> getEvolutionStages(@PathVariable Long courseId) {
        return ResponseEntity.ok(courseService.getEvolutionStages(courseId));
    }

    @GetMapping("/{courseId}/chests")
    public ResponseEntity<List<ChestResponseDto>> getChests(@PathVariable Long courseId) {
        return ResponseEntity.ok(courseService.getAllChests(courseId));
    }

    @GetMapping("/{courseId}/items")
    public ResponseEntity<List<ItemResponseDto>> getItems(@PathVariable Long courseId) {
        List<ItemResponseDto> itemRequestDtos = courseService.getAllCourseItems(courseId);
        return ResponseEntity.ok(itemRequestDtos);
    }

}
