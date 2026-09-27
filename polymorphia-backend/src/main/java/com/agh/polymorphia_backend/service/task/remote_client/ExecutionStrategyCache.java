package com.agh.polymorphia_backend.service.task.remote_client;

import com.agh.polymorphia_backend.model.gradable_event.subtypes.task.TaskExecutionMode;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;
import java.util.function.Supplier;

@Component
public class ExecutionStrategyCache {

    private static final Duration TTL = Duration.ofMinutes(2);

    private record CachedStrategies(List<TaskExecutionMode> strategies, Instant expiresAt) {
        boolean isValid() {
            return Instant.now().isBefore(expiresAt);
        }
    }

    private final AtomicReference<CachedStrategies> ref = new AtomicReference<>(null);

    public List<TaskExecutionMode> get(Supplier<List<TaskExecutionMode>> fetcher) {
        CachedStrategies cached = ref.get();
        if (cached != null && cached.isValid()) {
            return cached.strategies();
        }

        try {
            List<TaskExecutionMode> fetched = fetcher.get();
            if (fetched != null && !fetched.isEmpty()) {
                ref.set(new CachedStrategies(fetched, Instant.now().plus(TTL)));
                return fetched;
            }
        } catch (Exception exception) {
            if (cached != null) {
                return cached.strategies();
            }
        }

        return List.of();
    }
}
