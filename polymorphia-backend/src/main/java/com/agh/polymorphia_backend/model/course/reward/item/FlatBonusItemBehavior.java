package com.agh.polymorphia_backend.model.course.reward.item;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum FlatBonusItemBehavior {
    ONE_EVENT("Pozwala odrobić punkty z jednego eventu"),
    MULTIPLE_EVENTS("Pozwala odrobić punkty z kilku eventów");

    private final String textValue;

}
