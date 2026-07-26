package com.agh.polymorphia_backend.service.task;

import com.agh.polymorphia_backend.dto.request.task.ExecuteTaskRequestDto;
import com.agh.polymorphia_backend.dto.request.task.RemoteExecutionRequestDto;
import com.agh.polymorphia_backend.dto.response.task.*;
import com.agh.polymorphia_backend.model.gradable_event.subtypes.task.Task;
import com.agh.polymorphia_backend.model.gradable_event.subtypes.task.TaskAllowedLanguage;
import com.agh.polymorphia_backend.model.gradable_event.subtypes.task.TaskSupportedLanguage;
import com.agh.polymorphia_backend.model.gradable_event.subtypes.task.TaskTestCase;
import com.agh.polymorphia_backend.repository.task.*;
import com.agh.polymorphia_backend.service.task.executor.CodeExecutorClient;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TaskSubmissionService {

    private final TaskRepository taskRepository;
    private final TaskAllowedLanguageRepository taskAllowedLanguageRepository;
    private final TaskTestCaseRepository taskTestCaseRepository;
    private final TaskSubmissionRepository taskSubmissionRepository;
    private final TaskSubmissionResultRepository taskSubmissionResultRepository;
    private final CodeExecutorClient codeExecutorClient;
    private final TaskOutputMatcher taskOutputMatcher;

    @Transactional(readOnly = true)
    public ExecuteTaskResponseDto runTask(Long id, ExecuteTaskRequestDto request) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Nie znaleziono zadania."));

        Set<TaskSupportedLanguage> allowedLanguages =
                taskAllowedLanguageRepository.findLanguagesByTaskId(id);

        if (!allowedLanguages.contains(request.getTaskLanguage())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Zadanie nie może być uruchomione w tym języku.");
        }

        // visible
        List<TestCaseResultDto> results = taskTestCaseRepository.findVisibleByTaskId(id)
                .stream()
                .map(testCase -> runSingleTestCase(task, request, testCase))
                .toList();

        return ExecuteTaskResponseDto.builder()
                .results(results)
                .build();
    }

    public SubmitTaskResponseDto submitTask(Long id, ExecuteTaskRequestDto request) {
        return SubmitTaskResponseDto.builder().build();
    }

    public TaskSubmissionStatusResponseDto getTaskStatus(Long id, Long submissionId) {
        return TaskSubmissionStatusResponseDto.builder().build();
    }

    private TestCaseResultDto runSingleTestCase(Task task, ExecuteTaskRequestDto request, TaskTestCase testCase) {
        RemoteExecutionRequestDto remoteRequest = RemoteExecutionRequestDto.builder()
                .language(request.getTaskLanguage())
                .sourceCode(request.getSourceCode())
                .stdin(testCase.getInput())
                .cpuTimeLimitMs(resolveCpuLimit(task, testCase))
                .wallTimeLimitMs(task.getWallTimeLimitMs())
                .memoryLimitMb(task.getMemoryLimitMb())
                .build();

        RemoteExecutionResponseDto executionResponse = codeExecutorClient.executeSync(remoteRequest);

        boolean passed = isPassed(task, testCase, executionResponse);

        return TestCaseResultDto.builder()
                .testCaseId(testCase.getId())
                .orderIndex(testCase.getOrderIndex())
                .name(testCase.getName())
                .input(testCase.getInput())
                .expectedOutput(testCase.getExpectedOutput())
                .actualOutput(executionResponse.getStdout())
                .passed(passed)
                .stderr(executionResponse.getStderr())
                .exitCode(executionResponse.getExitCode())
                .executionTimeMs(executionResponse.getDurationMs())
                .build();
    }

    private boolean isPassed(Task task, TaskTestCase testCase, RemoteExecutionResponseDto executionResponse) {
        if (Boolean.TRUE.equals(executionResponse.getTimedOut())) {
            return false;
        }
        if (executionResponse.getExitCode() == null || executionResponse.getExitCode() != 0) {
            return false;
        }
        return taskOutputMatcher.matches(task.getOutputMatch(),
                testCase.getExpectedOutput(),
                executionResponse.getStdout());
    }

    private Integer resolveCpuLimit(Task task, TaskTestCase testCase) {
        return testCase.getTimeLimitOverrideMs() != null
                ? testCase.getTimeLimitOverrideMs()
                : task.getCpuTimeLimitMs();
    }
}
