package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.request.csv.process.TestGradingRequestDto;
import com.agh.polymorphia_backend.dto.request.grade.GradeRequestDto;
import com.agh.polymorphia_backend.dto.request.grade.ShortGradeRequestDto;
import com.agh.polymorphia_backend.dto.response.grade.ShortGradeResponseDtoWithType;
import com.agh.polymorphia_backend.service.csv.processors.TestGradingCSVProcessor;
import com.agh.polymorphia_backend.service.grade.GradingService;
import com.agh.polymorphia_backend.service.grade.ShortGradeService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/grading")
@AllArgsConstructor
public class GradingController {
    private final TestGradingCSVProcessor testGradingCSVProcessor;
    private final ShortGradeService shortGradeService;
    private final GradingService gradingService;

    @PostMapping("/csv/test")
    @PreAuthorize("hasAnyAuthority('INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<Void> processTestGradeCSV(@Valid @RequestBody TestGradingRequestDto request) {
        testGradingCSVProcessor.process(request);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/short-grade")
    @PreAuthorize("hasAnyAuthority('STUDENT', 'INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<ShortGradeResponseDtoWithType> getShortGrade(@RequestParam Long gradableEventId, @RequestBody ShortGradeRequestDto requestDto) {
        return ResponseEntity.ok(shortGradeService.getShortGrade(gradableEventId, requestDto.getTarget()));
    }

    @PostMapping()
    @PreAuthorize("hasAnyAuthority('INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<Void> processGrade(@Valid @RequestBody GradeRequestDto request) {
        gradingService.submitGrade(request);
        return ResponseEntity.noContent().build();
    }
}
