package com.agh.polymorphia_backend.model.gradable_event.subtypes.task;

import java.util.concurrent.ThreadLocalRandom;

public enum TaskExecutionMode {
    RANDOM,
    PLAIN_PROCESS,
    DOCKER;

    private static final TaskExecutionMode[] CONCRETE_STRATEGIES = {
            PLAIN_PROCESS,
            DOCKER
    };

    public TaskExecutionMode resolve() {
        if (this == RANDOM) {
            int randomIndex = ThreadLocalRandom.current().nextInt(CONCRETE_STRATEGIES.length);
            return CONCRETE_STRATEGIES[randomIndex];
        }
        return this;
    }

    public String resolveStrategy() {
        return resolve().name();
    }
}
