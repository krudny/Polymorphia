package com.agh.polymorphia_backend.service.csv;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Set;

@Getter
@RequiredArgsConstructor
public enum CSVType {
    STUDENT_INVITE("Email", "Imię", "Nazwisko"),
    GRADE_IMPORT("Numer indeksu", "Ocena");

    private final Set<String> requiredHeaders;

    CSVType(String... headers) {
        this.requiredHeaders = Set.of(headers);
    }
}