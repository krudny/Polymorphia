package com.agh.polymorphia_backend.dto.request.csv;

import lombok.Data;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Data
public class CSVPreviewRequestDto {
    private MultipartFile file;
    private String type;
    private String headers;
}
