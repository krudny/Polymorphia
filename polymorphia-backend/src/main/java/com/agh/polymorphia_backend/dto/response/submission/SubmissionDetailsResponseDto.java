package com.agh.polymorphia_backend.dto.response.submission;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;

import java.time.ZonedDateTime;
import java.util.Map;

@Builder
public record SubmissionDetailsResponseDto(Map<Long, SubmissionDetailsDto> details,
                                           @JsonFormat(shape = JsonFormat.Shape.STRING,
                                                   pattern = "dd.MM.yyyy") ZonedDateTime modifiedDate) {
}
