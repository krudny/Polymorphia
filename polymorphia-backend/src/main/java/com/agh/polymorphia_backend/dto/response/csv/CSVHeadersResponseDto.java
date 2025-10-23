package com.agh.polymorphia_backend.dto.response.csv;

import com.agh.polymorphia_backend.service.csv.CSVHeaders;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

import java.util.List;


@Builder
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CSVHeadersResponseDto {
    @NotNull
    private List<CSVHeaders> requiredCSVHeaders;

    @NotNull
    private List<String> fileCSVHeaders;
}
