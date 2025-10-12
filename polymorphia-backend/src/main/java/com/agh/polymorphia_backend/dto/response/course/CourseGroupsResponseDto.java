package com.agh.polymorphia_backend.dto.response.course;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CourseGroupsResponseDto {
    @NotNull
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String details;

    @NotNull
    private Integer studentCount;
}
