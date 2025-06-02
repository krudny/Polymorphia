package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.response.event.section.GradableEventResponseDto;
import com.agh.polymorphia_backend.service.event.gradable.CourseworkSectionService;
import com.agh.polymorphia_backend.service.event.gradable.TestSectionService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping()
public class GradableEventController {
    private final TestSectionService testService;
    private final CourseworkSectionService courseworkService;

    @GetMapping("/courseworks/{courseworkId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<GradableEventResponseDto> getAllCourseworks(@PathVariable Long courseworkId) {
        return ResponseEntity.ok(courseworkService.getOneEvent(courseworkId));
    }

    @GetMapping("/tests/{testId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<GradableEventResponseDto> getAllTests(@PathVariable Long testId) {
        return ResponseEntity.ok(testService.getOneEvent(testId));
    }
}
