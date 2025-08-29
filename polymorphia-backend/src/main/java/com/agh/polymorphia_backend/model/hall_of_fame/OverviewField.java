package com.agh.polymorphia_backend.model.hall_of_fame;

import lombok.Getter;

import java.util.Arrays;
import java.util.Optional;

import static com.agh.polymorphia_backend.model.hall_of_fame.HallOfFame.*;

@Getter
public enum OverviewField {
    STUDENT_NAME(FIELD_STUDENT_NAME),
    ANIMAL_NAME(FIELD_ANIMAL_NAME),
    TOTAL("total", FIELD_TOTAL_XP_SUM),
    BONUS("bonus", FIELD_TOTAL_BONUS_SUM);

    private final String key;
    private final String dbField;

    OverviewField(String key, String dbField) {
        this.key = key;
        this.dbField = dbField;
    }

    OverviewField(String key){
        this.key = key;
        this.dbField = key;
    }

    public static Optional<String> getDbFieldFromKey(String key) {
        return Arrays.stream(values())
                .filter(overviewField -> overviewField.key.equals(key))
                .map(overviewField -> overviewField.dbField)
                .findFirst();
    }
}
