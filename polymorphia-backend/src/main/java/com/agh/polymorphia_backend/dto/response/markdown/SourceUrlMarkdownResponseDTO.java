package com.agh.polymorphia_backend.dto.response.markdown;

import jakarta.annotation.Nullable;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SourceUrlMarkdownResponseDTO {
    @Nullable
    private String sourceUrl;
}
