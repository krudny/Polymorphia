package com.agh.polymorphia_backend.dto.request.target_list;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
public class GradingTargetListRequestDto extends TargetListRequestDto {
    @NotNull
    private Long gradableEventId;

    @NotNull
    private GradeStatus gradeStatus;

}
