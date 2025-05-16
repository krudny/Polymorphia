package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.response.page.event.AllGradableEventsResponseDto;
import com.agh.polymorphia_backend.service.gradable.GradableEventService;
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
    private GradableEventService gradableEventService;

    @GetMapping("/coursework-sections/{courseworkSectionId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<AllGradableEventsResponseDto> getAllCourseworks(@PathVariable Long courseworkSectionId) {
        return ResponseEntity.ok(gradableEventService.getAllCourseworks(courseworkSectionId));
    }

    @GetMapping("/test-sections/{testSectionId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<AllGradableEventsResponseDto> getAllTests(@PathVariable Long testSectionId) {
        return ResponseEntity.ok(gradableEventService.getAllTests(testSectionId));
    }


}
