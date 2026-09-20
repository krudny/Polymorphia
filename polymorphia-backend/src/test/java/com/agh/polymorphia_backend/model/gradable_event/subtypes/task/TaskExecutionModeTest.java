package com.agh.polymorphia_backend.model.gradable_event.subtypes.task;

import org.junit.jupiter.api.Test;

import java.util.HashSet;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

class TaskExecutionModeTest {

    @Test
    void shouldResolvePlainProcessStrategy() {
        assertThat(TaskExecutionMode.PLAIN_PROCESS.resolveStrategy()).isEqualTo("PLAIN_PROCESS");
    }

    @Test
    void shouldResolveDockerStrategy() {
        assertThat(TaskExecutionMode.DOCKER.resolveStrategy()).isEqualTo("DOCKER");
    }

    @Test
    void shouldResolveRandomStrategyToAllowedConcreteOptions() {
        Set<String> resolvedStrategies = new HashSet<>();
        for (int i = 0; i < 100; i++) {
            String resolved = TaskExecutionMode.RANDOM.resolveStrategy();
            assertThat(resolved).isIn("PLAIN_PROCESS", "DOCKER");
            resolvedStrategies.add(resolved);
        }
        assertThat(resolvedStrategies).contains("PLAIN_PROCESS", "DOCKER");
    }
}
