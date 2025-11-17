package com.agh.polymorphia_backend.dto.request.csv.process;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class TestGradingRequestDto {
    @NotNull
    private List<String> csvHeaders;

    @NotNull
    private List<List<String>> data;

    @NotNull
    private Long gradableEventId;

    @NotNull
    private Long criterionId;
}
