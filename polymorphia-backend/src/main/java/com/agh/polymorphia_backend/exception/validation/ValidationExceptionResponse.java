package com.agh.polymorphia_backend.exception.validation;

import lombok.Builder;

import java.util.List;

@Builder
public record ValidationExceptionResponse(
        String title,
        List<ValidationError> validationErrors
) {
}
