package com.agh.polymorphia_backend.dto.request.grade;

import com.agh.polymorphia_backend.dto.request.target.TargetRequestDto;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
@Builder(toBuilder = true)
public class GradeRequestDto {
    @NotNull
    private TargetRequestDto target;

    @NotNull
    private Long gradableEventId;

    @NotNull
    private Map<Long, CriterionGradeRequestDto> criteria;

    private String comment;
}
