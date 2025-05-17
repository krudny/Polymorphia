package com.agh.polymorphia_backend.dto.response.event.section.coursework;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CourseworkSubmissionResponseDto {
    @NotNull
    private Boolean containsExtraAssignment;

    private String prUrl;

    private String extraAssignmentPrUrl;

    private ZonedDateTime createdDate;

    private ZonedDateTime modifiedDate;
}
