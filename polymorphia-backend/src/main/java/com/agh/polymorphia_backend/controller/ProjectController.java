package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.request.target.TargetRequestDto;
import com.agh.polymorphia_backend.dto.response.project.ProjectVariantWithCategoryNameResponseDto;
import com.agh.polymorphia_backend.dto.response.user_context.UserDetailsResponseDto;
import com.agh.polymorphia_backend.service.project.ProjectService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@AllArgsConstructor
@RequestMapping("/projects")
public class ProjectController {
    private final ProjectService projectService;

    @PostMapping("/variants")
    @PreAuthorize("hasAnyAuthority('STUDENT', 'INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<List<ProjectVariantWithCategoryNameResponseDto>> getProjectVariants(@RequestBody TargetRequestDto target, @RequestParam Long projectId) {
        return ResponseEntity.ok(projectService.getProjectVariants(target, projectId));
    }

    @GetMapping("/group")
    @PreAuthorize("hasAnyAuthority('STUDENT', 'INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<List<UserDetailsResponseDto>> getProjectGroupMembers(@RequestParam Long studentId, @RequestParam Long projectId) {
        return ResponseEntity.ok(projectService.getAnimalProjectGroup(studentId, projectId));
    }
}
