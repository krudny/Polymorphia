package com.agh.polymorphia_backend.dto.response.course_groups;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class CourseGroupsShortResponseDto {
    @NotNull
    private Long id;

    @NotNull
    private String name;
}
