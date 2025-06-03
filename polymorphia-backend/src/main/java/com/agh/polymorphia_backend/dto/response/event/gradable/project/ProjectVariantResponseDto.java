package com.agh.polymorphia_backend.dto.response.event.gradable.project;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
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
    @NotNull
    private Long id;

    @NotEmpty
    private String category;

    @NotEmpty
    private String name;

    @NotEmpty
    private String description;
}
