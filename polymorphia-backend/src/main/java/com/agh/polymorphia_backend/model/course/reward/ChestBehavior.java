package com.agh.polymorphia_backend.model.course.reward;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ChestBehavior {
    ALL("Otrzymujesz pełną zawartość skrzynki"),
    ONE_OF_MANY("Wybierz jeden przedmiot ze skrzynki");

    private final String textValue;
}
