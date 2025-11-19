package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.response.event.EventSectionResponseDto;
import com.agh.polymorphia_backend.service.event_section.EventSectionService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@AllArgsConstructor
@RequestMapping
public class EventSectionController {

    private final EventSectionService eventSectionService;

    @GetMapping("/event-sections")
    @PreAuthorize("hasAnyAuthority('STUDENT', 'INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<List<EventSectionResponseDto>> getEventSections(@RequestParam Long courseId) {
        return ResponseEntity.ok(eventSectionService.getCourseEventSectionsResponseDto(courseId));
    }
}
