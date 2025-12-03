package com.agh.polymorphia_backend.dto.request.course_import.event_section;

import com.agh.polymorphia_backend.dto.request.course_import.gradable_event.ProjectDetailsRequestDto;
import com.agh.polymorphia_backend.dto.request.course_import.variant.VariantCategoryDetailsRequestDto;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Getter
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class ProjectSectionDetailsRequestDto extends EventSectionDetailsRequestDto {
    @NotNull
    private List<ProjectDetailsRequestDto> gradableEvents;

    @NotNull
    private List<VariantCategoryDetailsRequestDto> variantCategories;
}
