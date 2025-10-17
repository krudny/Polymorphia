package com.agh.polymorphia_backend.dto.response.course_groups;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CourseGroupsShortResponseDto {
    @NotNull
    private Long id;

    @NotNull
    private String name;
}
