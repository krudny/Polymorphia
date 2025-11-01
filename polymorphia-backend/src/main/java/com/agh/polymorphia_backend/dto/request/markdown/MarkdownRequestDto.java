package com.agh.polymorphia_backend.dto.request.markdown;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class MarkdownRequestDto {
    @NotBlank
    @Size(max = 50000, message = "pole \"markdown\" przekracza maksymalny rozmiar")
    private String markdown;
}
