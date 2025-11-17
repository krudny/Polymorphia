package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.request.markdown.MarkdownRequestDto;
import com.agh.polymorphia_backend.dto.response.markdown.MarkdownResponseDto;
import com.agh.polymorphia_backend.dto.response.markdown.SourceUrlMarkdownResponseDto;
import com.agh.polymorphia_backend.service.markdown.MarkdownService;
import com.agh.polymorphia_backend.service.markdown.MarkdownType;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/markdown")
public class MarkdownController {
    private final MarkdownService markdownService;

    @GetMapping("/{type}/{resourceId}")
    @PreAuthorize("hasAnyAuthority('STUDENT', 'INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<MarkdownResponseDto> getMarkdown(
            @PathVariable MarkdownType type,
            @PathVariable Long resourceId) {

        return ResponseEntity.ok(markdownService.getMarkdown(type, resourceId));
    }

    @GetMapping("/{type}/{resourceId}/source")
    @PreAuthorize("hasAnyAuthority('COORDINATOR')")
    public ResponseEntity<SourceUrlMarkdownResponseDto> getMarkdownSourceUrl(
            @PathVariable MarkdownType type,
            @PathVariable Long resourceId) {

        return ResponseEntity.ok(markdownService.getMarkdownSourceUrl(type, resourceId));
    }

    @PutMapping("/{type}/{resourceId}")
    @PreAuthorize("hasAnyAuthority('COORDINATOR')")
    public ResponseEntity<Void> setMarkdown(
            @PathVariable MarkdownType type,
            @PathVariable Long resourceId,
            @RequestBody @Valid MarkdownRequestDto requestDTO) {

        markdownService.setMarkdown(type, resourceId, requestDTO.getMarkdown());
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{type}/{resourceId}/reset")
    @PreAuthorize("hasAnyAuthority('COORDINATOR')")
    public ResponseEntity<Void> resetMarkdown(
            @PathVariable MarkdownType type,
            @PathVariable Long resourceId) {

        markdownService.resetMarkdown(type, resourceId);
        return ResponseEntity.noContent().build();
    }
}
