package com.agh.polymorphia_backend.dto.response.course_groups;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
public class CourseGroupsShortResponseDto {
    @NotNull
    private Long id;

    @NotNull
    private String name;
}
