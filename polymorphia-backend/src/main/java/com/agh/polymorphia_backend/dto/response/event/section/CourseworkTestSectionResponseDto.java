package com.agh.polymorphia_backend.dto.response.event.section;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@SuperBuilder
@Data
@EqualsAndHashCode(callSuper = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class CourseworkTestSectionResponseDto extends EventSectionResponseDto {
    @NotNull
    private List<GradableEventShortResponseDto> gradableEvents;
}
