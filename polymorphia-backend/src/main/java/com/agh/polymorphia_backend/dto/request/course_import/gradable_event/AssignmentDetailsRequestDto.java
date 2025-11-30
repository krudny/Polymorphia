package com.agh.polymorphia_backend.dto.request.course_import.gradable_event;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
public class AssignmentDetailsRequestDto extends GradableEventDetailsRequestDto {
}
