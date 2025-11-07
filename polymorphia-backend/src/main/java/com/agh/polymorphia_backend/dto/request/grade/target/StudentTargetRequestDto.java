package com.agh.polymorphia_backend.dto.request.grade.target;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class StudentTargetRequestDto extends TargetRequestDto {
    @NotNull
    private Long id;
}
