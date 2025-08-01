package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.response.event.section.EventSectionResponseDto;
import com.agh.polymorphia_backend.dto.response.event.section.GradableEventResponseDto;
import com.agh.polymorphia_backend.dto.response.grade.PointsSummaryResponseDto;
import com.agh.polymorphia_backend.service.event.EventSectionService;
import com.agh.polymorphia_backend.service.event.GradableEventService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/event-sections")
public class EventSectionController {
    private final EventSectionService eventSectionService;
    private final GradableEventService gradableEventService;

    @GetMapping()
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<com.agh.polymorphia_backend.dto.response.event.section.EventSectionResponseDto>> getEventSections(@RequestParam Long courseId) {
        return ResponseEntity.ok(eventSectionService.getEventSections(courseId));
    }

    @GetMapping("/{eventSectionId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<EventSectionResponseDto> getEventSection(@PathVariable Long eventSectionId) {
        return ResponseEntity.ok(eventSectionService.getEventSection(eventSectionId));
    }

    @GetMapping("/{eventSectionId}/gradable-events")
    @PreAuthorize("hasAuthority('STUDENT')")
    public ResponseEntity<Page<GradableEventResponseDto>> getGradableEvents(Pageable pageable, @PathVariable Long eventSectionId) {
        return ResponseEntity.ok(gradableEventService.getGradableEventDtos(eventSectionId, pageable));
    }

    @GetMapping("/{eventSectionId}/points-summary")
    @PreAuthorize("hasAuthority('STUDENT')")
    public ResponseEntity<PointsSummaryResponseDto> getPointsSummary(@PathVariable Long eventSectionId) {
        return ResponseEntity.ok(eventSectionService.getPointsSummary(eventSectionId));
    }


}
