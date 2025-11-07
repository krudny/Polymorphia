package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.response.project.ProjectVariantResponseDto;
import com.agh.polymorphia_backend.dto.response.user_context.UserDetailsResponseDto;
import com.agh.polymorphia_backend.service.project.ProjectService;
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
@RequestMapping("/projects")
public class ProjectController {
    private final ProjectService projectService;

    @GetMapping("/variants")
    @PreAuthorize("hasAnyAuthority('STUDENT', 'INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<List<ProjectVariantResponseDto>> getProjectVariants(@RequestParam Long userId, @RequestParam Long projectId) {
        return ResponseEntity.ok(projectService.getProjectVariants(userId, projectId));
    }

    @GetMapping("/group")
    @PreAuthorize("hasAnyAuthority('STUDENT', 'INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<List<UserDetailsResponseDto>> getProjectGroup(@RequestParam Long userId, @RequestParam Long projectId) {
        return ResponseEntity.ok(projectService.getAnimalProjectGroup(userId, projectId));
    }
}
