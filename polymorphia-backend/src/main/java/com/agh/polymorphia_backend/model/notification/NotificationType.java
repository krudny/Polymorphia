package com.agh.polymorphia_backend.model.notification;

import com.agh.polymorphia_backend.dto.request.notification.NotificationCreationRequest;
import java.util.Objects;
import java.util.function.Predicate;

public enum NotificationType {
    NEW_GRADE(
            request -> Objects.nonNull(request.getGradableEvent()),
            ErrorMessages.GRADABLE_EVENT_NULL_FOR_GRADE
    ),

    NEW_REWARD(
            request -> Objects.nonNull(request.getReward()),
            ErrorMessages.REWARD_NULL
    );

    private final Predicate<NotificationCreationRequest> validationRule;
    private final String validationErrorMessage;

    NotificationType(Predicate<NotificationCreationRequest> validationRule, String validationErrorMessage) {
        this.validationRule = validationRule;
        this.validationErrorMessage = validationErrorMessage;
    }

    public void validate(NotificationCreationRequest request) {
        if (!validationRule.test(request)) {
            throw new IllegalArgumentException(validationErrorMessage);
        }
    }

    private static final class ErrorMessages {
        private static final String GRADABLE_EVENT_NULL_FOR_GRADE = "Wydarzenie nie może być puste dla powiadomienia o nowej ocenie.";
        private static final String REWARD_NULL = "Nagroda nie może być pusta dla tego typu powiadomienia.";

        private ErrorMessages() {
        }
    }
}
