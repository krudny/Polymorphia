package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.response.event.gradable.GradableEventShortResponseDto;
import com.agh.polymorphia_backend.dto.response.event.section.EventSectionResponseDto;
import com.agh.polymorphia_backend.service.event.gradable.AssignmentSectionService;
import com.agh.polymorphia_backend.service.event.gradable.ProjectSectionService;
import com.agh.polymorphia_backend.service.event.gradable.TestSectionService;
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
@RequestMapping()
public class EventSectionController {
    private final TestSectionService testService;
    private final ProjectSectionService projectService;
    private final AssignmentSectionService assignmentService;

    @GetMapping("/assignment-sections/{assignmentSectionId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<EventSectionResponseDto> getAssignmentSection(@PathVariable Long assignmentSectionId) {
        return ResponseEntity.ok(assignmentService.getAllEvents(assignmentSectionId));
    }

    @GetMapping("/assignment-sections/{assignmentSectionId}/gradable-events")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<GradableEventShortResponseDto>> getAllAssignments(@PathVariable Long assignmentSectionId) {
        return ResponseEntity.ok(assignmentService.getShortGradableEvents(assignmentSectionId));
    }

    @GetMapping("/test-sections/{testSectionId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<EventSectionResponseDto> getTestSection(@PathVariable Long testSectionId) {
        return ResponseEntity.ok(testService.getAllEvents(testSectionId));
    }

    @GetMapping("/test-sections/{testSectionId}/gradable-events")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<GradableEventShortResponseDto>> getAllTests(@PathVariable Long testSectionId) {
        return ResponseEntity.ok(testService.getShortGradableEvents(testSectionId));
    }

    @GetMapping("/project-sections/{projectSectionId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<EventSectionResponseDto> getProject(@PathVariable Long projectSectionId) {
        return ResponseEntity.ok(projectService.getAllEvents(projectSectionId));
    }
}
