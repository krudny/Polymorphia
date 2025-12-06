package com.agh.polymorphia_backend.dto.response.course_groups;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
public class CourseGroupsResponseDto extends CourseGroupsShortResponseDto {
    @NotEmpty
    private final String room;

    @NotNull
    private final Long teachingRoleId;

    @NotNull
    private final int studentCount;
}
