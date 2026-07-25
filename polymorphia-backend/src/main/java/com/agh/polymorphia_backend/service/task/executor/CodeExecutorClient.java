package com.agh.polymorphia_backend.service.task.executor;

import com.agh.polymorphia_backend.dto.request.task.RemoteExecutionRequestDto;
import com.agh.polymorphia_backend.dto.response.task.RemoteExecutionResponseDto;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;
import org.springframework.web.server.ResponseStatusException;

@Component
@AllArgsConstructor
public class CodeExecutorClient {
    private final RestClient codeExecutorRestClient;

    public RemoteExecutionResponseDto executeSync(RemoteExecutionRequestDto request) {
        try {
            return codeExecutorRestClient
                    .post()
                    .uri("/execute")
                    .retrieve()
                    .body(RemoteExecutionResponseDto.class);
        } catch (RestClientException exception) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE,
                    "Moduł wykonywania kodu nie jest dostępny", exception);
        }
    }
}
