package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.response.event.gradable.GradableEventResponseDto;
import com.agh.polymorphia_backend.service.event.gradable.AssignmentSectionService;
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
    private final AssignmentSectionService assignmentService;

    @GetMapping("/assignments/{assignmentId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<GradableEventResponseDto> getAllAssignments(@PathVariable Long assignmentId) {
        return ResponseEntity.ok(assignmentService.getOneEvent(assignmentId));
    }

    @GetMapping("/tests/{testId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<GradableEventResponseDto> getAllTests(@PathVariable Long testId) {
        return ResponseEntity.ok(testService.getOneEvent(testId));
    }
}
