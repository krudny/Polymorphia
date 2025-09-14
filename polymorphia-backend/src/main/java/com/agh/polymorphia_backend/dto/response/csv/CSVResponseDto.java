package com.agh.polymorphia_backend.dto.response.csv;

import java.util.List;

public record CSVResponseDto(List<String> csvHeaders, List<String[]> data) {}

