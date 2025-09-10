package com.agh.polymorphia_backend.dto.request.csv;

import com.agh.polymorphia_backend.service.csv.CSVResult;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class CSVProcessRequestDto {
    private String type;
    private String[] headers;
    private List<String[]> data;
}
