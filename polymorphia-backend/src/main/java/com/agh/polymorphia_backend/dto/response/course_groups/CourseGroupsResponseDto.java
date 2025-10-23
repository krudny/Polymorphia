package com.agh.polymorphia_backend.dto.response.course_groups;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
public class CourseGroupsResponseDto extends CourseGroupsShortResponseDto{
    @NotNull
    private final String details;

    @NotNull
    private final int studentCount;
}
