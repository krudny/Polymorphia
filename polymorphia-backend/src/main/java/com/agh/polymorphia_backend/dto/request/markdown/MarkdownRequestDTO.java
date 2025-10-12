package com.agh.polymorphia_backend.dto.request.markdown;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class MarkdownRequestDTO {
    @NotNull
    @Size(min = 1, max = 50000, message = "Markdown file is too large")
    private String markdown;
}
