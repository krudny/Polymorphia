package com.agh.polymorphia_backend.service.csv;

import java.util.List;

public record CSVResult(String[] headers, List<String[]> data) {}

