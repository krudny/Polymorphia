package com.agh.polymorphia_backend.service.validation;

import com.agh.polymorphia_backend.service.task.remote_client.UnsafeProcessConfig;
import com.agh.polymorphia_backend.model.gradable_event.subtypes.task.TaskExecutionMode;
import com.agh.polymorphia_backend.service.task.remote_client.CodeExecutorClient;
import com.agh.polymorphia_backend.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Stream;

@Slf4j
@Service
@RequiredArgsConstructor
public class ExecutionStrategyAuthorizer {

    private final UserService userService;
    private final CodeExecutorClient codeExecutorClient;
    private final UnsafeProcessConfig unsafeProcessConfig;

    public List<TaskExecutionMode> getAvailableModesForCurrentUser() {
        return filterForUser(codeExecutorClient.getAvailableStrategies());
    }

    public void authorize(TaskExecutionMode mode) {
        if (mode == TaskExecutionMode.UNSAFE_PROCESS && !isUnsafeProcessAllowed(resolveCurrentUserEmail())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Brak uprawnień do UNSAFE_PROCESS");
        }
    }

    private List<TaskExecutionMode> filterForUser(List<TaskExecutionMode> strategies) {
        boolean canUseUnsafeProcess = isUnsafeProcessAllowed(resolveCurrentUserEmail());
        Stream<TaskExecutionMode> available = strategies.stream()
            .filter(mode -> mode != TaskExecutionMode.UNSAFE_PROCESS || canUseUnsafeProcess);
        return Stream.concat(Stream.of(TaskExecutionMode.RANDOM), available).toList();
    }

    private boolean isUnsafeProcessAllowed(String email) {
        if (email == null || email.isBlank()) {
            return false;
        }
        return unsafeProcessConfig.allowedPrincipals().stream()
            .anyMatch(allowedEmail -> allowedEmail.trim().equalsIgnoreCase(email.trim()));
    }

    private String resolveCurrentUserEmail() {
        try {
            return userService.getCurrentUser().getUsername();
        } catch (Exception exception) {
            log.debug("Could not resolve current user email from context: {}", exception.getMessage());
            return null;
        }
    }
}