package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.response.event.gradable.MarkdownResponseDto;
import com.agh.polymorphia_backend.service.event.GradableEventService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/gradable-events")
public class GradableEventController {
    private final GradableEventService gradableEventService;

    @GetMapping("/{gradableEventId}/markdown")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<MarkdownResponseDto> getGradableEventMarkdown(@PathVariable Long gradableEventId) {
        return ResponseEntity.ok(gradableEventService.getMarkdown(gradableEventId));
    }

    @PutMapping("/{gradableEventId}/markdown")
    @PreAuthorize("hasAuthority('COORDINATOR')")
    public ResponseEntity<Void> saveGradableEventMarkdown(@PathVariable Long gradableEventId, @RequestBody MarkdownResponseDto markdown) {
        gradableEventService.saveMarkdown(gradableEventId, markdown);
        return ResponseEntity.ok().build();
    }
}
