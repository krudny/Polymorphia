package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.response.csv.HeadersResponseDto;
import com.agh.polymorphia_backend.service.csv.CSVReadMode;
import com.agh.polymorphia_backend.service.csv.CSVResult;
import com.agh.polymorphia_backend.service.csv.CSVService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

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
    public CSVResult importCSV(@RequestParam MultipartFile file, @RequestParam String type) {
        return csvService.readCSV(file, type, CSVReadMode.ALL);
    }
}
