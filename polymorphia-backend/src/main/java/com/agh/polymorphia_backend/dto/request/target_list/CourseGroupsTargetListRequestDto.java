package com.agh.polymorphia_backend.dto.request.target_list;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;


@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class CourseGroupsTargetListRequestDto extends TargetListRequestDto {
    @NotNull
    private Long courseGroupId;
}
