package com.agh.polymorphia_backend.dto.response.markdown;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MarkdownResponseDto {
    @NotNull
    private String markdown;
}
