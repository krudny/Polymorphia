package com.agh.polymorphia_backend.dto.response.csv;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

import java.util.List;


@Builder
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class HeadersResponseDto {
    @NotNull
    private List<String> requiredHeaders;

    @NotNull
    private List<String> fileHeaders;
}
