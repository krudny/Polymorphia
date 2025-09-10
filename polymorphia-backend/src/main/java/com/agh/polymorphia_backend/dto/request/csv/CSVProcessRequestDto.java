package com.agh.polymorphia_backend.dto.request.csv;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.util.List;

@Data
public class CSVProcessRequestDto {
    @NotNull
    private String type;

    @NotNull
    private String[] headers;

    @NotNull
    private List<String[]> data;
}
