package com.agh.polymorphia_backend.service.csv;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CSVHeaders {
    EMAIL("Email"),
    FIRST_NAME("Imię"),
    LAST_NAME("Nazwisko"),
    INDEX_NUMBER("Numer indeksu"),
    XP("Zdobyte XP");

    @JsonValue
    private final String value;
}