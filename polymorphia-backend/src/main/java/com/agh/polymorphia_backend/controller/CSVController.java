package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.request.csv.CSVPreviewRequestDto;
import com.agh.polymorphia_backend.dto.request.csv.StudentInvitationProcessRequestDto;
import com.agh.polymorphia_backend.dto.request.csv.TestGradingProcessRequestDto;
import com.agh.polymorphia_backend.dto.response.csv.CSVHeadersResponseDto;
import com.agh.polymorphia_backend.dto.response.csv.CSVResponseDto;
import com.agh.polymorphia_backend.service.csv.CSVService;
import com.agh.polymorphia_backend.service.csv.CSVType;
import com.agh.polymorphia_backend.service.csv.processors.StudentInvitationProcessor;
import com.agh.polymorphia_backend.service.csv.processors.TestGradingProcessor;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/csv")
@AllArgsConstructor
public class CSVController {
    private final CSVService csvService;
    private final TestGradingProcessor testGradingProcessor;
    private final StudentInvitationProcessor studentInvitationProcessor;

    @PostMapping("/headers")
    @PreAuthorize("hasAnyAuthority('INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<CSVHeadersResponseDto> getCSVHeaders(@RequestParam MultipartFile file, @RequestParam CSVType type) {
        return ResponseEntity.ok(csvService.getCSVHeaders(file, type));
    }

    @PostMapping("/preview")
    @PreAuthorize("hasAnyAuthority('INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<CSVResponseDto> getCSVPreview(@ModelAttribute CSVPreviewRequestDto request) {
        return ResponseEntity.ok(csvService.getCSVPreview(request));
    }

    // TODO: should be moved to dedicated controller
    @PostMapping("/process/test-grade")
    @PreAuthorize("hasAnyAuthority('INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<Void> processTestGradeCSV(@RequestBody TestGradingProcessRequestDto request) {
        testGradingProcessor.process(request);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
    
    // TODO: should be moved to dedicated controller
    @PostMapping("/process/student-invite")
    @PreAuthorize("hasAnyAuthority('INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<Void> processStudentInviteCSV(@RequestBody StudentInvitationProcessRequestDto request) {
        studentInvitationProcessor.process(request);
        return ResponseEntity.status(HttpStatus.OK).build();
    }


}
