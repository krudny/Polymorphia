package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.request.csv.CSVPreviewRequestDto;
import com.agh.polymorphia_backend.dto.response.csv.HeadersResponseDto;
import com.agh.polymorphia_backend.service.csv.CSVReadMode;
import com.agh.polymorphia_backend.service.csv.CSVResult;
import com.agh.polymorphia_backend.service.csv.CSVService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/csv")
@AllArgsConstructor
public class CSVController {
    private CSVService csvService;

    @PostMapping("/headers")
    public HeadersResponseDto getHeaders(@RequestParam MultipartFile file, @RequestParam String type) {
        return csvService.getHeaders(file, type);
    }

    @PostMapping("/preview")
    public CSVResult getPreview(@ModelAttribute CSVPreviewRequestDto request) {
        return csvService.getPreview(request);
    }
}
