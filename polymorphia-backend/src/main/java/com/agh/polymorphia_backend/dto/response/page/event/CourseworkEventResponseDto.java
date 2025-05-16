package com.agh.polymorphia_backend.dto.response.page.event;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Data
@EqualsAndHashCode(callSuper = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class CourseworkEventResponseDto extends GradableEventResponseDto {
    @NotEmpty
    private String infoUrl;

    @NotEmpty
    private String topic;

    @NotNull
    private Boolean containsExtraAssignment;

    private String prUrl;

    private String extraAssignmentPrUrl;

    @NotNull
    private Boolean hidden;

}
