package com.agh.polymorphia_backend.dto.request.target_list;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class GradingTargetListRequestDto extends TargetListRequestDto {
    @NotNull
    private List<String> groups;

    @NotNull
    private Long gradableEventId;

    @NotNull
    private GradeStatus gradeStatus;

}
