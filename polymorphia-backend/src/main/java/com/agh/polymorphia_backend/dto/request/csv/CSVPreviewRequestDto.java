package com.agh.polymorphia_backend.dto.request.csv;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CSVPreviewRequestDto {
    @NotNull
    private MultipartFile file;

    @NotNull
    private String headers;
}
