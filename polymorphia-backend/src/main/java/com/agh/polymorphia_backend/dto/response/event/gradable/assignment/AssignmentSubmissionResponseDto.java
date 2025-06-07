package com.agh.polymorphia_backend.dto.response.event.gradable.assignment;

import com.fasterxml.jackson.annotation.JsonFormat;
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
public class AssignmentSubmissionResponseDto {
    @NotNull
    private Boolean containsExtraAssignment;

    private String prUrl;

    private String extraAssignmentPrUrl;

    @JsonFormat(pattern="dd.MM.yyyy")
    private ZonedDateTime createdDate;

    @JsonFormat(pattern="dd.MM.yyyy")
    private ZonedDateTime modifiedDate;
}
