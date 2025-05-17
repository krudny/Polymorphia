package com.agh.polymorphia_backend.dto.response.event.section.project;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class ProjectVariantResponseDto {
    @NotEmpty
    private String category;

    @NotEmpty
    private String name;

    @NotEmpty
    private String description;
}
