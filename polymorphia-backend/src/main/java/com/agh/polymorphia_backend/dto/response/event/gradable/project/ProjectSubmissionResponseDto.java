package com.agh.polymorphia_backend.dto.response.event.gradable.project;

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
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProjectSubmissionResponseDto {
    @NotNull
    private String projectUrl;

    @NotNull
    @JsonFormat(pattern="dd.MM.yyyy")
    private ZonedDateTime createdDate;

    @NotNull
    @JsonFormat(pattern="dd.MM.yyyy")
    private ZonedDateTime modifiedDate;
}
