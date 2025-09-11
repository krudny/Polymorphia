package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.request.csv.CSVPreviewRequestDto;
import com.agh.polymorphia_backend.dto.request.csv.CSVProcessRequestDto;
import com.agh.polymorphia_backend.dto.response.csv.HeadersResponseDto;
import com.agh.polymorphia_backend.service.csv.CSVResult;
import com.agh.polymorphia_backend.service.csv.CSVService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/csv")
@AllArgsConstructor
public class CSVController {
    private CSVService csvService;

    @PostMapping("/headers")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<HeadersResponseDto> getHeaders(@RequestParam MultipartFile file, @RequestParam String type) {
        return ResponseEntity.ok(csvService.getHeaders(file, type));
    }

    @PostMapping("/preview")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<CSVResult> getPreview(@ModelAttribute CSVPreviewRequestDto request) {
        return ResponseEntity.ok(csvService.getPreview(request));
    }

    @PostMapping("/process")
    @PreAuthorize("isAuthenticated()")
    public void processCSV(@RequestBody CSVProcessRequestDto request) {
        csvService.processCSV(request);
    }
}
