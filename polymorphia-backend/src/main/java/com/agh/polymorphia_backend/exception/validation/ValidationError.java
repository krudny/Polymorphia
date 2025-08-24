package com.agh.polymorphia_backend.exception.validation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ValidationError {
    private final String field;
    private final String message;
}
