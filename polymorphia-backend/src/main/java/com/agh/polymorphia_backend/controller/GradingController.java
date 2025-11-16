package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.request.csv.process.TestGradingRequestDto;
import com.agh.polymorphia_backend.dto.request.grade.GradeRequestDto;
import com.agh.polymorphia_backend.service.csv.processors.TestGradingCSVProcessor;
import com.agh.polymorphia_backend.service.grade.GradingService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/grading")
@AllArgsConstructor
public class GradingController {
    private final TestGradingCSVProcessor testGradingCSVProcessor;
    private final GradingService gradingService;

    @PostMapping("/csv/test")
    @PreAuthorize("hasAnyAuthority('INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<Void> processTestGradeCSV(@RequestBody TestGradingRequestDto request) {
        testGradingCSVProcessor.process(request);
        return ResponseEntity.noContent().build();
    }

    @PostMapping()
    @PreAuthorize("hasAnyAuthority('INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<Void> processGrade(@Valid @RequestBody GradeRequestDto request) {
        gradingService.submitGrade(request);
        return ResponseEntity.ok().build();
    }
}
