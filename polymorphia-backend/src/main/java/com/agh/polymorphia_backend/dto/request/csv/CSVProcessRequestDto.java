package com.agh.polymorphia_backend.dto.request.csv;

import com.agh.polymorphia_backend.service.csv.CSVType;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class CSVProcessRequestDto {
    @NotNull
    private CSVType type;

    @NotNull
    private List<String> csvHeaders;

    @NotNull
    private List<String[]> data;
}
