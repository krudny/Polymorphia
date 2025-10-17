package com.agh.polymorphia_backend.dto.response.course_groups;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CourseGroupsResponseDto {
    @NotNull
    private final Long id;

    @NotNull
    private final String name;

    @NotNull
    private final String details;

    @NotNull
    private final int studentCount;
}
