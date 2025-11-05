package com.agh.polymorphia_backend.model.notification;

import com.agh.polymorphia_backend.dto.request.notification.NotificationCreationRequest;
import java.util.Objects;
import java.util.function.Predicate;

public enum NotificationType {
    NEW_EVOLUTION_STAGE(
            request -> Objects.nonNull(request.getEvolutionStage()),
            ErrorMessages.EVOLUTION_STAGE_NULL
    ),

    NEW_GRADE(
            request -> Objects.nonNull(request.getGradableEvent()),
            ErrorMessages.GRADABLE_EVENT_NULL_FOR_GRADE
    ),

    NEW_REWARD(
            request -> Objects.nonNull(request.getReward()),
            ErrorMessages.REWARD_NULL
    ),

    NEW_EVENT(
            request -> Objects.nonNull(request.getGradableEvent()),
            ErrorMessages.GRADABLE_EVENT_NULL_FOR_EVENT
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
        private static final String EVOLUTION_STAGE_NULL = "EvolutionStage nie może być null dla tego typu powiadomienia.";
        private static final String GRADABLE_EVENT_NULL_FOR_GRADE = "GradableEvent nie może być null dla powiadomienia o nowej ocenie.";
        private static final String REWARD_NULL = "Reward nie może być null dla tego typu powiadomienia.";
        private static final String GRADABLE_EVENT_NULL_FOR_EVENT = "GradableEvent nie może być null dla tego typu powiadomienia.";

        private ErrorMessages() {
        }
    }
}
