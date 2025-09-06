package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.response.knowledge_base.KnowledgeBaseResponseDto;
import com.agh.polymorphia_backend.dto.response.user_context.AvailableCoursesResponseDto;
import com.agh.polymorphia_backend.service.course.KnowledgeBaseService;
import com.agh.polymorphia_backend.service.user.UserContextService;
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
    private final UserContextService userContextService;

    @GetMapping("/{courseId}/evolution-stages")
    @PreAuthorize("hasAnyAuthority('STUDENT', 'INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<List<KnowledgeBaseResponseDto>> getEvolutionStages(@PathVariable Long courseId) {
        return ResponseEntity.ok(knowledgeBaseService.getEvolutionStages(courseId));
    }

    @GetMapping("/{courseId}/chests")
    @PreAuthorize("hasAnyAuthority('STUDENT', 'INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<List<KnowledgeBaseResponseDto>> getChests(@PathVariable Long courseId) {
        return ResponseEntity.ok(knowledgeBaseService.getChests(courseId));
    }

    @GetMapping("/{courseId}/items")
    @PreAuthorize("hasAnyAuthority('STUDENT', 'INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<List<KnowledgeBaseResponseDto>> getItems(@PathVariable Long courseId) {
        return ResponseEntity.ok(knowledgeBaseService.getItems(courseId));
    }

    @GetMapping()
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<AvailableCoursesResponseDto>> getAvailableCourses() {
        return ResponseEntity.ok(userContextService.getAvailableCourses());
    }
}
