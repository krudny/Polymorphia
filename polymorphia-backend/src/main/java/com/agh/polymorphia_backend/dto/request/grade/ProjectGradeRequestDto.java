package com.agh.polymorphia_backend.dto.request.grade;


import com.agh.polymorphia_backend.dto.request.grade.targets.GradedTarget;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@NoArgsConstructor
@SuperBuilder
@Data
@EqualsAndHashCode(callSuper = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProjectGradeRequestDto extends GradeRequestDto {
    @NotNull
    private GradedTarget gradedTarget;
}
