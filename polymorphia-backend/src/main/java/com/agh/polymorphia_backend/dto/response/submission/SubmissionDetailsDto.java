package com.agh.polymorphia_backend.dto.response.submission;

import jakarta.validation.constraints.NotNull;

public record SubmissionDetailsDto(@NotNull String url, @NotNull boolean isLocked) {
}
