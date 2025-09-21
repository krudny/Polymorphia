package com.agh.polymorphia_backend.dto.response.csv;

import lombok.Builder;

import java.util.List;

@Builder
public record CSVResponseDto(List<String> csvHeaders, List<List<String>> data) {}

