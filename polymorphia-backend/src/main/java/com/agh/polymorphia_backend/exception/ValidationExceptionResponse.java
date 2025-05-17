package com.agh.polymorphia_backend.exception;

import lombok.Builder;

import java.util.List;

@Builder
public record ValidationExceptionResponse(
        String title,
        List<ValidationError> validationErrors
) {
}
