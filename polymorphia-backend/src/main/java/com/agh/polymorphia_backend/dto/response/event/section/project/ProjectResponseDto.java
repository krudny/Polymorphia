package com.agh.polymorphia_backend.dto.response.event.section.project;

import com.agh.polymorphia_backend.dto.response.event.section.EventSectionResponseDto;
import com.agh.polymorphia_backend.dto.response.event.section.GradableEventResponseDto;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@SuperBuilder
@Data
@EqualsAndHashCode(callSuper = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class ProjectResponseDto extends EventSectionResponseDto {
    @NotNull
    private Boolean submitted;

    private ProjectSubmissionResponseDto submission;

    @NotNull
    private List<GradableEventResponseDto> projectCriteria;

    @NotNull
    private List<AnimalResponseDto> projectAnimals;

    @NotNull
    private List<ProjectVariantResponseDto> projectVariants;
}
