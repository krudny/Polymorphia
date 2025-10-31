package com.agh.polymorphia_backend.dto.request;

import com.agh.polymorphia_backend.dto.request.target.TargetRequestDto;
import com.agh.polymorphia_backend.dto.response.submission.SubmissionDetailsDto;
import lombok.Builder;

import java.util.Map;

@Builder
public record SubmissionDetailsRequestDto(TargetRequestDto target, Map<Long, SubmissionDetailsDto> details) {
}
