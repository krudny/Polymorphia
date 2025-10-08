package com.agh.polymorphia_backend.exception.validation;

import lombok.AllArgsConstructor;
import lombok.Builder;

@Builder
@AllArgsConstructor
public record ValidationError(String field, String message) {
}
