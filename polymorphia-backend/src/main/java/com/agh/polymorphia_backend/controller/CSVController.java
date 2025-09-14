package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.request.csv.CSVPreviewRequestDto;
import com.agh.polymorphia_backend.dto.request.csv.CSVProcessRequestDto;
import com.agh.polymorphia_backend.dto.response.csv.CSVHeadersResponseDto;
import com.agh.polymorphia_backend.dto.response.csv.CSVResponseDto;
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
    public ResponseEntity<CSVHeadersResponseDto> getCSVHeaders(@RequestParam MultipartFile file, @RequestParam String type) {
        return ResponseEntity.ok(csvService.getCSVHeaders(file, type));
    }

    @PostMapping("/preview")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<CSVResponseDto> getCSVPreview(@ModelAttribute CSVPreviewRequestDto request) {
        return ResponseEntity.ok(csvService.getCSVPreview(request));
    }

    @PostMapping("/process")
    @PreAuthorize("isAuthenticated()")
    public void processCSV(@RequestBody CSVProcessRequestDto request) {
        csvService.processCSV(request);
    }
}
