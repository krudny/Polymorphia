package com.agh.polymorphia_backend.model.hall_of_fame;

import com.fasterxml.jackson.annotation.JsonCreator;

import static com.agh.polymorphia_backend.model.hall_of_fame.HallOfFameEntry.FIELD_ANIMAL_NAME;
import static com.agh.polymorphia_backend.model.hall_of_fame.HallOfFameEntry.FIELD_STUDENT_NAME;

public enum SearchBy {
    STUDENT_NAME,
    ANIMAL_NAME;

    public boolean searchByAnimal() {
        return this == ANIMAL_NAME;
    }

    public boolean searchByStudent() {
        return this == STUDENT_NAME;
    }

    @JsonCreator
    public static SearchBy fromString(String value) {
        return switch (value){
            case FIELD_ANIMAL_NAME -> ANIMAL_NAME;
            case FIELD_STUDENT_NAME -> STUDENT_NAME;
            default -> throw new IllegalArgumentException("Invalid searchBy: " + value);
        };
    }
}
