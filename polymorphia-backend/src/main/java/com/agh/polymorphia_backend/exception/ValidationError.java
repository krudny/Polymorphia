package com.agh.polymorphia_backend.exception;

import lombok.Builder;

@Builder
public class ValidationError {
    private final String field;
    private final String message;
}
