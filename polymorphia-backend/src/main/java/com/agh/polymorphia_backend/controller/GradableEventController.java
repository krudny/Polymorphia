package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.response.event.section.AllGradableEventsResponseDto;
import com.agh.polymorphia_backend.service.event.gradable.CourseworkService;
import com.agh.polymorphia_backend.service.event.gradable.ProjectService;
import com.agh.polymorphia_backend.service.event.gradable.TestService;
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
    private final TestService testService;
    private final ProjectService projectService;
    private final CourseworkService courseworkService;

    @GetMapping("/coursework-sections/{courseworkSectionId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<AllGradableEventsResponseDto> getAllCourseworks(@PathVariable Long courseworkSectionId) {
        return ResponseEntity.ok(courseworkService.getAllEvents(courseworkSectionId));
    }

    @GetMapping("/test-sections/{testSectionId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<AllGradableEventsResponseDto> getAllTests(@PathVariable Long testSectionId) {
        return ResponseEntity.ok(testService.getAllEvents(testSectionId));
    }

    @GetMapping("/project-sections/{projectSectionId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<AllGradableEventsResponseDto> getProject(@PathVariable Long projectSectionId) {
        return ResponseEntity.ok(projectService.getAllEvents(projectSectionId));
    }
}
