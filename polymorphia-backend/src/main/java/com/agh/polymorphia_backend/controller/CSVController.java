package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.service.csv.CSVService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequestMapping("/csv")
@AllArgsConstructor
public class CSVController {
    private CSVService csvService;

    @PostMapping("/preview")
    public List<String[]> importCSV(@RequestParam MultipartFile file, @RequestParam String type) {
        return csvService.readCSV(file, type);
    }
}
