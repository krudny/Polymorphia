package com.agh.polymorphia_backend.dto.request.csv;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class TestGradingCSVProcessRequestDto {
    @NotNull
    private List<String> csvHeaders;

    @NotNull
    private List<List<String>> data;

    @NotNull
    private Integer gradableEventId;
}
