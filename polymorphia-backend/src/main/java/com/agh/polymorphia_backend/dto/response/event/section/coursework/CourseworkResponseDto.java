package com.agh.polymorphia_backend.dto.response.event.section.coursework;

import com.agh.polymorphia_backend.dto.response.event.section.GradableEventResponseDto;
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
public class CourseworkResponseDto extends GradableEventResponseDto {
    @NotEmpty
    private String infoUrl;

    @NotEmpty
    private String topic;

    @NotEmpty
    private Boolean submitted;

    private CourseworkSubmissionResponseDto submission;

    @NotNull
    private Boolean hidden;

}
