package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.request.csv.process.TestGradingRequestDto;
import com.agh.polymorphia_backend.dto.request.grade.ShortGradeRequestDto;
import com.agh.polymorphia_backend.dto.response.grade.ShortGradeResponseDtoWithType;
import com.agh.polymorphia_backend.service.csv.processors.TestGradingCSVProcessor;
import com.agh.polymorphia_backend.service.gradable_event.ShortGradeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/grading")
@AllArgsConstructor
public class GradingController {
    private final TestGradingCSVProcessor testGradingCSVProcessor;
    private final ShortGradeService shortGradeService;

    @PostMapping("/csv/test")
    @PreAuthorize("hasAnyAuthority('INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<Void> processTestGradeCSV(@RequestBody TestGradingRequestDto request) {
        testGradingCSVProcessor.process(request);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/short-grade")
    @PreAuthorize("hasAnyAuthority('STUDENT', 'INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<ShortGradeResponseDtoWithType> getShortGrade(@RequestParam Long gradableEventId, @RequestBody ShortGradeRequestDto requestDto) {
        return ResponseEntity.ok(shortGradeService.getShortGrade(gradableEventId, requestDto.getTarget()));
    }
}
