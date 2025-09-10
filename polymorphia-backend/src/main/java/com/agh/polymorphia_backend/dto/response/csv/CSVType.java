package com.agh.polymorphia_backend.dto.response.csv;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Set;

@Getter
@RequiredArgsConstructor
public enum CSVType {
    STUDENT_INVITE("email", "first_name", "last_name"),
    GRADE_IMPORT("Numer indeksu", "Ocena");

    private final Set<String> requiredHeaders;

    CSVType(String... headers) {
        this.requiredHeaders = Set.of(headers);
    }
}