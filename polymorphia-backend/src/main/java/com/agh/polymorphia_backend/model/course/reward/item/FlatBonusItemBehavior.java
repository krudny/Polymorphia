package com.agh.polymorphia_backend.model.course.reward.item;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum FlatBonusItemBehavior {
    ONE_EVENT_TRIGGERED("Wymaga aktywacji, pozwala odrobić punkty z jednego eventu"),
    MULTIPLE_EVENTS_INSTANT("Działa natychmiastowo, pozwala odrobić punkty z kilku eventów");

    private final String textValue;

}
