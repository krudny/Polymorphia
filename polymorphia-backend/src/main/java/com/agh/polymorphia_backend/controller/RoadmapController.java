package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.response.event.BaseGradableEventResponseDto;
import com.agh.polymorphia_backend.service.roadmap.RoadmapService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/roadmap")
public class RoadmapController {
    private final RoadmapService roadmapService;

    @GetMapping()
    @PreAuthorize("hasAnyAuthority('STUDENT', 'INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<List<BaseGradableEventResponseDto>> getRoadmap(@RequestParam Long courseId) {
        return ResponseEntity.ok(roadmapService.getRoadmap(courseId));
    }
}
