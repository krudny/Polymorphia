package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.response.knowledge_base.KnowledgeBaseResponseDto;
import com.agh.polymorphia_backend.dto.response.markdown.MarkdownResponseDTO;
import com.agh.polymorphia_backend.service.course.CourseService;
import com.agh.polymorphia_backend.service.course.KnowledgeBaseService;
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
@RequestMapping("/courses")
public class CourseController {
    private final KnowledgeBaseService knowledgeBaseService;
    private final CourseService courseService;

    @GetMapping("/{courseId}/evolution-stages")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<KnowledgeBaseResponseDto>> getEvolutionStages(@PathVariable Long courseId) {
        return ResponseEntity.ok(knowledgeBaseService.getEvolutionStages(courseId));
    }

    @GetMapping("/{courseId}/chests")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<KnowledgeBaseResponseDto>> getChests(@PathVariable Long courseId) {
        return ResponseEntity.ok(knowledgeBaseService.getChests(courseId));
    }

    @GetMapping("/{courseId}/items")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<KnowledgeBaseResponseDto>> getItems(@PathVariable Long courseId) {
        return ResponseEntity.ok(knowledgeBaseService.getItems(courseId));
    }

    @GetMapping("/{courseId}/rules")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<MarkdownResponseDTO> getRules(@PathVariable Long courseId) {
        return ResponseEntity.ok(courseService.getCourseRules(courseId));
    }
}
