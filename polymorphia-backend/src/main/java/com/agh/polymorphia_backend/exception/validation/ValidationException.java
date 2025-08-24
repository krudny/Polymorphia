package com.agh.polymorphia_backend.exception.validation;

import lombok.Getter;

@Getter
public class ValidationException extends RuntimeException {
    private final ValidationExceptionResponse validationExceptionResponse;

    public ValidationException(ValidationExceptionResponse validationExceptionResponse) {
        super(validationExceptionResponse.title());
        this.validationExceptionResponse = validationExceptionResponse;
    }
}
