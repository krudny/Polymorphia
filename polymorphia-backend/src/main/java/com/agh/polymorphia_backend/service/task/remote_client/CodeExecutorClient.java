package com.agh.polymorphia_backend.service.task.remote_client;

import com.agh.polymorphia_backend.dto.request.task.RemoteExecutionRequestDto;
import com.agh.polymorphia_backend.dto.response.task.RemoteExecutionResponseDto;
import com.agh.polymorphia_backend.model.gradable_event.subtypes.task.TaskExecutionMode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;
import java.util.stream.Collectors;

@Slf4j
@Component
@RequiredArgsConstructor
public class CodeExecutorClient {

    private static final Map<String, TaskExecutionMode> MODES_BY_NAME = Arrays.stream(TaskExecutionMode.values())
        .collect(Collectors.toMap(Enum::name, Function.identity()));

    private final RestClient codeExecutorRestClient;
    private final ExecutionStrategyCache strategyCache;

    public List<TaskExecutionMode> getAvailableStrategies() {
        return strategyCache.get(this::fetchStrategies);
    }

    public RemoteExecutionResponseDto executeSync(RemoteExecutionRequestDto request) {
        try {
            return codeExecutorRestClient
                .post()
                .uri("/executions/sync")
                .body(request)
                .retrieve()
                .body(RemoteExecutionResponseDto.class);
        } catch (RestClientException exception) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE,
                "Moduł wykonywania kodu nie jest dostępny", exception);
        }
    }

    private List<TaskExecutionMode> fetchStrategies() {
        List<String> raw = codeExecutorRestClient
            .get()
            .uri("/executions/strategies")
            .retrieve()
            .body(new ParameterizedTypeReference<List<String>>() {});

        if (raw == null) {
            return List.of();
        }

        return raw.stream()
            .map(name -> resolveMode(name.toUpperCase()))
            .filter(Objects::nonNull)
            .toList();
    }

    private TaskExecutionMode resolveMode(String name) {
        TaskExecutionMode mode = MODES_BY_NAME.get(name);
        if (mode == null) {
            log.warn("Unknown execution strategy from executor: {}", name);
        }
        return mode;
    }
}