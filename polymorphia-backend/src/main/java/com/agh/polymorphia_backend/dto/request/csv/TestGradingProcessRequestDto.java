package com.agh.polymorphia_backend.dto.request.csv;

import com.agh.polymorphia_backend.service.csv.CSVType;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class TestGradingProcessRequestDto {
    @NotNull
    private CSVType type;

    @NotNull
    private List<String> csvHeaders;

    @NotNull
    private List<String[]> data;

    @NotNull
    private Integer gradableEventId;
}
