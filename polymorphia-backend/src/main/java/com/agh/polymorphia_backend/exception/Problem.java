package com.agh.polymorphia_backend.exception;

import lombok.Builder;

@Builder
public record Problem(
        String title,
        String description
) {

}
