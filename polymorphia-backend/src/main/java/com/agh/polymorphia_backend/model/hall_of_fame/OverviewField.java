package com.agh.polymorphia_backend.model.hall_of_fame;

import java.util.Arrays;
import java.util.Optional;

public enum OverviewField {
    ANIMAL_NAME("animalName", "animalName"),
    TOTAL("total", "totalXpSum"),
    BONUS("bonus", "totalBonusSum");

    private final String key;
    private final String dbField;

    OverviewField(String key, String dbField) {
        this.key = key;
        this.dbField = dbField;
    }

    public static Optional<String> getDbField(String key) {
        return Arrays.stream(values())
                .filter(overviewField -> overviewField.key.equals(key))
                .map(overviewField -> overviewField.dbField)
                .findFirst();
    }
}
