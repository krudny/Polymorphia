package com.agh.polymorphia_backend.dto.response.submission;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record SubmissionDetailsDto(@NotNull String url, @NotNull boolean isLocked) {
}
