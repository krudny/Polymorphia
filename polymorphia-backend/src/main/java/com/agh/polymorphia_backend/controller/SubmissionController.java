package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.request.SubmissionDetailsRequestDto;
import com.agh.polymorphia_backend.dto.request.target.TargetRequestDto;
import com.agh.polymorphia_backend.dto.response.submission.SubmissionDetailsResponseDto;
import com.agh.polymorphia_backend.dto.response.submission.SubmissionRequirementResponseDto;
import com.agh.polymorphia_backend.service.submission.SubmissionService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/submissions")
public class SubmissionController {
    private final SubmissionService submissionService;

    @GetMapping("/requirements")
    @PreAuthorize("hasAnyAuthority('STUDENT', 'INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<List<SubmissionRequirementResponseDto>> getSubmissionRequirements(
            @RequestParam Long gradableEventId) {
        return ResponseEntity.ok(submissionService.getSubmissionRequirements(gradableEventId));
    }

    @PostMapping("/details")
    @PreAuthorize("hasAnyAuthority('STUDENT', 'INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<SubmissionDetailsResponseDto> getSubmissionDetails(@RequestParam Long gradableEventId,
                                                                             @Valid @RequestBody
                                                                             TargetRequestDto target) {
        return ResponseEntity.ok(submissionService.getSubmissionDetails(gradableEventId, target));
    }

    @PutMapping("/details")
    @PreAuthorize("hasAnyAuthority('STUDENT', 'INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<Void> putSubmissionDetails(@RequestParam Long gradableEventId,
                                                     @Valid @RequestBody SubmissionDetailsRequestDto requestDto) {
        submissionService.putSubmissionDetails(gradableEventId, requestDto);
        return ResponseEntity.noContent().build();
    }
}
