package com.agh.polymorphia_backend.dto.request.course_import;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SubmissionRequirementDetailsRequestDto {
    @NotEmpty
    private String name;

    @NotNull
    private Boolean isMandatory;
}
