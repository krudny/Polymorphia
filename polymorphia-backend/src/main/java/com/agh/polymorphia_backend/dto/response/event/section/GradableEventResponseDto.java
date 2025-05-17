package com.agh.polymorphia_backend.dto.response.event.section;

import com.agh.polymorphia_backend.dto.response.event.section.grade.GradeResponseDto;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class GradableEventResponseDto {
    @NotNull
    private Long id;

    @NotEmpty
    private String name;

    private GradeResponseDto grade;

    @NotNull
    private Integer maxXp;

    @NotNull
    private Boolean graded;
}
