package com.agh.polymorphia_backend.dto.response.event.gradable.coursework;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
@AllArgsConstructor
public class CourseworkSubmissionResponseDto {
    @NotNull
    private Boolean containsExtraAssignment;

    private String prUrl;

    private String extraAssignmentPrUrl;

    private ZonedDateTime createdDate;

    private ZonedDateTime modifiedDate;
}
