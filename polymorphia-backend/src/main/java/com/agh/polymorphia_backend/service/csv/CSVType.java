package com.agh.polymorphia_backend.service.csv;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Set;

@Getter
@RequiredArgsConstructor
public enum CSVType {
    STUDENT_INVITE(CSVHeaders.EMAIL, CSVHeaders.FIRST_NAME, CSVHeaders.LAST_NAME),
    GRADE_IMPORT(CSVHeaders.INDEX_NUMBER, CSVHeaders.XP),
    GROUP_INVITE(CSVHeaders.EMAIL);

    private final Set<String> requiredCSVHeaders;

    CSVType(String... csvHeaders) {
        this.requiredCSVHeaders = Set.of(csvHeaders);
    }
}