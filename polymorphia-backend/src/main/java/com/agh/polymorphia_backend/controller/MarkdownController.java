package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.request.markdown.MarkdownRequestDTO;
import com.agh.polymorphia_backend.dto.response.markdown.MarkdownResponseDTO;
import com.agh.polymorphia_backend.dto.response.markdown.SourceUrlMarkdownResponseDTO;
import com.agh.polymorphia_backend.service.markdown.MarkdownService;
import com.agh.polymorphia_backend.service.markdown.MarkdownType;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/markdown")
public class MarkdownController {
    private final MarkdownService markdownService;

    @GetMapping("/{type}/{resourceId}")
    public ResponseEntity<MarkdownResponseDTO> getMarkdown(
            @PathVariable MarkdownType type,
            @PathVariable Long resourceId) {

        return ResponseEntity.ok(markdownService.getMarkdown(type, resourceId));
    }

    @GetMapping("/{type}/{resourceId}/source")
    public ResponseEntity<SourceUrlMarkdownResponseDTO> getMarkdownSourceUrl(
            @PathVariable MarkdownType type,
            @PathVariable Long resourceId) {

        return ResponseEntity.ok(markdownService.getMarkdownSourceUrl(type, resourceId));
    }

    @PutMapping("/{type}/{resourceId}")
    public ResponseEntity<Void> setMarkdown(
            @PathVariable MarkdownType type,
            @PathVariable Long resourceId,
            @RequestBody @Valid MarkdownRequestDTO requestDTO) {

        markdownService.setMarkdown(type, resourceId, requestDTO.getMarkdown());
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{type}/{resourceId}/reset")
    public ResponseEntity<Void> resetMarkdown(
            @PathVariable MarkdownType type,
            @PathVariable Long resourceId) {

        markdownService.resetMarkdown(type, resourceId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
