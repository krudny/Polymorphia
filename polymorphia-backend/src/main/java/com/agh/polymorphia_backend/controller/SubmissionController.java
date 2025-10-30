package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.request.target.TargetRequestDto;
import com.agh.polymorphia_backend.dto.response.submission.SubmissionDetailsDto;
import com.agh.polymorphia_backend.dto.response.submission.SubmissionRequirementResponseDto;
import com.agh.polymorphia_backend.service.submission.SubmissionService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/submissions")
public class SubmissionController {
    private final SubmissionService submissionService;

    @GetMapping("/requirements")
    @PreAuthorize("hasAnyAuthority('STUDENT', 'INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<List<SubmissionRequirementResponseDto>> getSubmissionRequirements(@RequestParam Long gradableEventId) {
        return ResponseEntity.ok(submissionService.getSubmissionRequirements(gradableEventId));
    }

    @GetMapping("")
    @PreAuthorize("hasAnyAuthority('STUDENT', 'INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<Map<Long, SubmissionDetailsDto>> getSubmissionDetails(@RequestParam Long gradableEventId, @RequestBody TargetRequestDto target) {
        return ResponseEntity.ok(submissionService.getSubmissionDetails(gradableEventId, target));
    }
}
