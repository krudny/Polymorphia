package com.agh.polymorphia_backend.dto.response.event;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@Data
public class InstructorGradableEventResponseDto extends BaseGradableEventResponseDto {

    @NotNull
    private Long ungradedStudents;

    @NotNull
    private Boolean isHidden;

    @NotNull
    private Boolean hasPossibleReward;
}
