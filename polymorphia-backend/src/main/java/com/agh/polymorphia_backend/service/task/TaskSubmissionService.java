package com.agh.polymorphia_backend.service.task;

import com.agh.polymorphia_backend.dto.request.task.ExecuteTaskRequestDto;
import com.agh.polymorphia_backend.dto.request.task.RemoteExecutionRequestDto;
import com.agh.polymorphia_backend.dto.response.task.*;
import com.agh.polymorphia_backend.model.gradable_event.subtypes.task.*;
import com.agh.polymorphia_backend.model.user.AbstractRoleUser;
import com.agh.polymorphia_backend.model.user.student.Animal;
import com.agh.polymorphia_backend.repository.task.*;
import com.agh.polymorphia_backend.service.gradable_event.GradableEventService;
import com.agh.polymorphia_backend.service.student.AnimalService;
import com.agh.polymorphia_backend.service.task.executor.CodeExecutorClient;
import com.agh.polymorphia_backend.service.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Set;

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
    private final UserService userService;
    private final AnimalService animalService;
    private final GradableEventService gradableEventService;
    private final TaskSubmissionProcessor taskSubmissionProcessor;

    @Transactional(readOnly = true)
    public ExecuteTaskResponseDto runTask(Long id, ExecuteTaskRequestDto request) {
        Task task = findTaskById(id);

        validateTaskLanguage(id, request.getTaskLanguage());

        List<TestCaseResultDto> results = taskTestCaseRepository.findVisibleByTaskId(id)
                .stream()
                .map(testCase -> runSingleTestCase(task, request, testCase))
                .toList();

        return ExecuteTaskResponseDto.builder()
                .results(results)
                .build();
    }

    @Transactional
    public SubmitTaskResponseDto submitTask(Long id, ExecuteTaskRequestDto request) {
        Task task = findTaskById(id);

        validateTaskLanguage(id, request.getTaskLanguage());

        Long courseId = gradableEventService.getCourseIdByGradableEventId(id);
        AbstractRoleUser currentUser = userService.getCurrentUser();
        Animal animal = animalService.getAnimal(currentUser.getUserId(), courseId);

        int attempt = taskSubmissionRepository.countByTaskIdAndAnimalId(id, animal.getId()) + 1;

        TaskSubmission submission = TaskSubmission.builder()
                .task(task)
                .animal(animal)
                .language(request.getTaskLanguage())
                .sourceCode(request.getSourceCode())
                .status(TaskSubmissionStatus.QUEUED)
                .attempt(attempt)
                .build();

        TaskSubmission savedSubmission = taskSubmissionRepository.save(submission);
        taskSubmissionProcessor.processSubmissionAsync(savedSubmission.getId());

        return SubmitTaskResponseDto.builder()
                .submissionId(savedSubmission.getId())
                .status(savedSubmission.getStatus())
                .build();
    }

    @Transactional(readOnly = true)
    public TaskSubmissionStatusResponseDto getTaskStatus(Long id, Long submissionId) {
        TaskSubmission submission = taskSubmissionRepository.findById(submissionId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Nie znaleziono zgłoszenia."));

        if (!submission.getTask().getId().equals(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Zgłoszenie nie należy do tego zadania.");
        }

        List<TaskSubmissionResult> visibleResults = taskSubmissionResultRepository.findVisibleResultsBySubmissionId(submissionId);
        List<TestCaseResultDto> visibleResultDtos = visibleResults.stream()
                .map(result -> TestCaseResultDto.builder()
                        .testCaseId(result.getTestCase().getId())
                        .orderIndex(result.getTestCase().getOrderIndex())
                        .name(result.getTestCase().getName())
                        .input(result.getTestCase().getInput())
                        .expectedOutput(result.getTestCase().getExpectedOutput())
                        .actualOutput(result.getActualOutput())
                        .passed(result.getStatus() == TaskTestCaseStatus.PASSED)
                        .stderr(result.getStderr())
                        .exitCode(result.getExitCode())
                        .executionTimeMs(result.getExecutionTimeMs())
                        .build())
                .toList();

        int totalExecutionTimeMs = visibleResults.stream()
                .filter(result -> result.getExecutionTimeMs() != null)
                .mapToInt(TaskSubmissionResult::getExecutionTimeMs)
                .sum();

        return TaskSubmissionStatusResponseDto.builder()
                .submissionId(submission.getId())
                .status(submission.getStatus())
                .score(submission.getScore())
                .passedCount(submission.getPassedCount())
                .totalCount(submission.getTotalCount())
                .totalExecutionTimeMs(totalExecutionTimeMs)
                .createdDate(submission.getCreatedDate())
                .visibleResults(visibleResultDtos)
                .errorMessage(submission.getErrorMessage())
                .build();
    }

    private Task findTaskById(Long id) {
        return taskRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Nie znaleziono zadania."));
    }

    private void validateTaskLanguage(Long taskId, TaskSupportedLanguage language) {
        boolean languageAllowed = taskAllowedLanguageRepository.existsByTaskIdAndLanguage(taskId, language);

        if (!languageAllowed) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Zadanie nie może być uruchomione w tym języku.");
        }
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

        try {
            return taskOutputMatcher.matches(task.getOutputMatchMode(),
                testCase.getExpectedOutput(),
                executionResponse.getStdout());
        } catch (IllegalArgumentException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }
    }

    private Integer resolveCpuLimit(Task task, TaskTestCase testCase) {
        return testCase.getTimeLimitOverrideMs() != null
                ? testCase.getTimeLimitOverrideMs()
                : task.getCpuTimeLimitMs();
    }
}
