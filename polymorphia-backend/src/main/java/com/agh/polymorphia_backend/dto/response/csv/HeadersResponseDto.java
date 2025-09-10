package com.agh.polymorphia_backend.dto.response.csv;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;


@Builder
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class HeadersResponseDto {
    @NotNull
    private String[] requiredHeaders;

    @NotNull
    private String[] fileHeaders;
}
