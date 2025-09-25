package com.agh.polymorphia_backend.dto.request.markdown;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SetMarkdownRequestDTO {
    @NotNull
    private Long gradableEventId;

    @NotNull
    @Size(min = 1, max = 50000, message = "Markdown file is to large")
    private String markdown;
}
