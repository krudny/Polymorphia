package com.agh.polymorphia_backend.dto.request.course_import;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SubmissionRequirementDetailsRequestDto {
    @NotEmpty
    private String key;

    @NotEmpty
    private String name;

    @NotNull
    private Boolean isMandatory;
}
