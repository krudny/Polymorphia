package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.response.knowledge_base.KnowledgeBaseResponseDto;
import com.agh.polymorphia_backend.service.course.KnowledgeBaseService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/knowledge-base")
public class KnowledgeBaseController {
    private final KnowledgeBaseService knowledgeBaseService;

    @GetMapping("/evolution-stages")
    @PreAuthorize("hasAnyAuthority('STUDENT', 'INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<List<KnowledgeBaseResponseDto>> getEvolutionStages(@RequestParam Long courseId) {
        return ResponseEntity.ok(knowledgeBaseService.getEvolutionStages(courseId));
    }

    @GetMapping("/chests")
    @PreAuthorize("hasAnyAuthority('STUDENT', 'INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<List<KnowledgeBaseResponseDto>> getChests(@RequestParam Long courseId) {
        return ResponseEntity.ok(knowledgeBaseService.getChests(courseId));
    }

    @GetMapping("/items")
    @PreAuthorize("hasAnyAuthority('STUDENT', 'INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<List<KnowledgeBaseResponseDto>> getItems(@RequestParam Long courseId) {
        return ResponseEntity.ok(knowledgeBaseService.getItems(courseId));
    }
}
