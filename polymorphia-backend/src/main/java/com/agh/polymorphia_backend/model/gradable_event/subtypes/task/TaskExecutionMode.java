package com.agh.polymorphia_backend.model.gradable_event.subtypes.task;

import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

public enum TaskExecutionMode {
    RANDOM,
    UNSAFE_PROCESS,
    SAFE_PROCESS,
    DOCKER;

    public TaskExecutionMode resolve(List<TaskExecutionMode> allowedModes) {
        if (this != RANDOM) {
            return this;
        }
        List<TaskExecutionMode> candidates = allowedModes.stream()
                .filter(mode -> mode != RANDOM)
                .toList();
        return candidates.get(ThreadLocalRandom.current().nextInt(candidates.size()));
    }
}
