package com.agh.polymorphia_backend.dto.request.course_group;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChangeStudentCourseGroupRequestDto {
    @NotNull
    private Long animalId;

    @NotNull
    private Long newCourseGroupId;
}

