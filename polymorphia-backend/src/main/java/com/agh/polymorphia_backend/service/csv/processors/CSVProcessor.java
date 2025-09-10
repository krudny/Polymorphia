package com.agh.polymorphia_backend.service.csv.processors;

import com.agh.polymorphia_backend.dto.request.csv.CSVProcessRequestDto;
import com.agh.polymorphia_backend.dto.response.csv.CSVType;

public interface CSVProcessor {
    CSVType getSupportedType();
    void process(CSVProcessRequestDto request);
}
