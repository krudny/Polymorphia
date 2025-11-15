package com.agh.polymorphia_backend.service.csv;

import lombok.Getter;

import java.util.Set;

@Getter
public enum CSVType {
    STUDENT_INVITE(CSVHeaders.EMAIL, CSVHeaders.FIRST_NAME, CSVHeaders.LAST_NAME),
    GRADE_IMPORT(CSVHeaders.INDEX_NUMBER, CSVHeaders.XP),
    GROUP_INVITE(CSVHeaders.EMAIL);

    private final Set<CSVHeaders> requiredCSVHeaders;

    CSVType(CSVHeaders... headers) {
        this.requiredCSVHeaders = Set.of(headers);
    }
}