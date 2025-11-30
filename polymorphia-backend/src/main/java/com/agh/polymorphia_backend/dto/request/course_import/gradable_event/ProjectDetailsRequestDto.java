package com.agh.polymorphia_backend.dto.request.course_import.gradable_event;

import jakarta.validation.constraints.NotNull;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
public class ProjectDetailsRequestDto extends GradableEventDetailsRequestDto {
    @NotNull
    private Boolean allowCrossCourseGroupProjectGroup;
}
