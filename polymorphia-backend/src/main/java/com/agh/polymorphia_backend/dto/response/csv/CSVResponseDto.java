package com.agh.polymorphia_backend.dto.response.csv;

import java.util.List;

public record CSVResponseDto(List<String> headers, List<String[]> data) {}

