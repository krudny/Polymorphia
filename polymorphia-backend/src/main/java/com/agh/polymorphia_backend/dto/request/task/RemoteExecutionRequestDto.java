package com.agh.polymorphia_backend.dto.request.task;

import com.agh.polymorphia_backend.model.gradable_event.subtypes.task.TaskSupportedLanguage;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RemoteExecutionRequestDto {
    private final Long executionId;

    private final TaskSupportedLanguage language;

    private final String sourceCode;

    private final String stdin;

    private final Integer cpuTimeLimitMs;

    private final Integer wallTimeLimitMs;

    private final Integer memoryLimitMb;

    private final String callbackUrl;
}
