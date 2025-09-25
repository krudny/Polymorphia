package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.request.markdown.MarkdownRequestDTO;
import com.agh.polymorphia_backend.dto.response.markdown.MarkdownResponseDTO;
import com.agh.polymorphia_backend.service.markdown.MarkdownService;
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

    @GetMapping()
    public ResponseEntity<MarkdownResponseDTO> getMarkdown(@RequestParam Long gradableEventId) {
        return ResponseEntity.ok(markdownService.getMarkdown(gradableEventId));
    }

    @PostMapping
    public ResponseEntity<Void> setMarkdown(@RequestBody @Valid MarkdownRequestDTO requestDTO) {
        markdownService.setMarkdown(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping
    public ResponseEntity<Void> updateMarkdown(@RequestParam Long gradableEventId) {
        markdownService.updateMarkdown(gradableEventId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
