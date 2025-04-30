package com.agh.polymorphia_backend.exception;

import lombok.Builder;

@Builder
public record CustomExceptionResponse(
        String title,
        String description
) {

}
