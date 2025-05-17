package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.request.grade.GradeRequestDto;
import com.agh.polymorphia_backend.service.GradeService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/grades")
public class GradeController {
    private final GradeService gradeService;

    @PostMapping()
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<List<Long>> grade(@RequestBody GradeRequestDto gradeRequestDto) {
        List<Long> gradeIds = gradeService.grade(gradeRequestDto);
        return ResponseEntity.ok(gradeIds);
    }
}
