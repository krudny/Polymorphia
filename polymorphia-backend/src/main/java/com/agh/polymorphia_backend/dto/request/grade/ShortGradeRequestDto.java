package com.agh.polymorphia_backend.dto.request.grade;

import com.agh.polymorphia_backend.dto.request.grade.target.TargetRequestDto;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class ShortGradeRequestDto {
    @NotNull
    private TargetRequestDto target;
}
