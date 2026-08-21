package com.agh.polymorphia_backend.service.task;

import com.agh.polymorphia_backend.dto.request.task.RemoteExecutionRequestDto;
import com.agh.polymorphia_backend.dto.response.task.RemoteExecutionResponseDto;
import com.agh.polymorphia_backend.model.criterion.CriterionGrade;
import com.agh.polymorphia_backend.model.gradable_event.subtypes.task.*;
import com.agh.polymorphia_backend.model.grade.Grade;
import com.agh.polymorphia_backend.model.user.student.Animal;
import com.agh.polymorphia_backend.repository.task.TaskSubmissionRepository;
import com.agh.polymorphia_backend.repository.task.TaskSubmissionResultRepository;
import com.agh.polymorphia_backend.repository.task.TaskTestCaseRepository;
import com.agh.polymorphia_backend.service.criteria.CriterionGradeService;
import com.agh.polymorphia_backend.service.grade.GradeService;
import com.agh.polymorphia_backend.service.reward.BonusXpCalculator;
import com.agh.polymorphia_backend.service.task.executor.CodeExecutorClient;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskSubmissionProcessor {

    private final TaskSubmissionRepository taskSubmissionRepository;
    private final TaskSubmissionResultRepository taskSubmissionResultRepository;
    private final TaskTestCaseRepository taskTestCaseRepository;
    private final CodeExecutorClient codeExecutorClient;
    private final TaskOutputMatcher taskOutputMatcher;
    private final GradeService gradeService;
    private final CriterionGradeService criterionGradeService;
    private final BonusXpCalculator bonusXpCalculator;

    @Async
    @Transactional
    public void processSubmissionAsync(Long submissionId) {
        TaskSubmission submission = taskSubmissionRepository.findById(submissionId).orElse(null);

        if (submission == null) {
            return;
        }

        submission.setStatus(TaskSubmissionStatus.RUNNING);
        submission.setStartedAt(Instant.now());
        taskSubmissionRepository.save(submission);

        try {
            Task task = submission.getTask();
            List<TaskTestCase> testCases = taskTestCaseRepository.findByTaskId(task.getId());

            BigDecimal passedWeight = BigDecimal.ZERO;
            BigDecimal totalWeight = BigDecimal.ZERO;
            int passedCount = 0;
            int totalCount = testCases.size();

            for (TaskTestCase testCase : testCases) {
                BigDecimal weight = testCase.getWeight() != null ? testCase.getWeight() : BigDecimal.ONE;
                totalWeight = totalWeight.add(weight);

                RemoteExecutionRequestDto remoteRequest = RemoteExecutionRequestDto.builder()
                        .language(submission.getLanguage())
                        .sourceCode(submission.getSourceCode())
                        .stdin(testCase.getInput())
                        .cpuTimeLimitMs(resolveCpuLimit(task, testCase))
                        .wallTimeLimitMs(task.getWallTimeLimitMs())
                        .memoryLimitMb(task.getMemoryLimitMb())
                        .build();

                RemoteExecutionResponseDto executionResponse = codeExecutorClient.executeSync(remoteRequest);
                TaskTestCaseStatus testCaseStatus = determineTestCaseStatus(task, testCase, executionResponse);

                if (testCaseStatus == TaskTestCaseStatus.PASSED) {
                    passedCount++;
                    passedWeight = passedWeight.add(weight);
                }

                TaskSubmissionResult submissionResult = TaskSubmissionResult.builder()
                        .submission(submission)
                        .testCase(testCase)
                        .status(testCaseStatus)
                        .actualOutput(executionResponse.getStdout())
                        .stdout(executionResponse.getStdout())
                        .stderr(executionResponse.getStderr())
                        .exitCode(executionResponse.getExitCode())
                        .executionTimeMs(executionResponse.getDurationMs())
                        .build();

                taskSubmissionResultRepository.save(submissionResult);
            }

            BigDecimal scorePercentage = calculateScorePercentage(task.getGradingStrategy(), passedCount, totalCount, passedWeight, totalWeight);

            submission.setPassedWeight(passedWeight);
            submission.setTotalWeight(totalWeight);
            submission.setPassedCount(passedCount);
            submission.setTotalCount(totalCount);
            submission.setScore(scorePercentage);
            submission.setStatus(TaskSubmissionStatus.COMPLETED);
            submission.setFinishedAt(Instant.now());
            taskSubmissionRepository.save(submission);

            assignGradeToAnimal(submission.getAnimal(), task, scorePercentage);
        } catch (Exception exception) {
            submission.setStatus(TaskSubmissionStatus.INTERNAL_ERROR);
            submission.setErrorMessage(exception.getMessage());
            submission.setFinishedAt(Instant.now());
            taskSubmissionRepository.save(submission);
        }
    }

    private TaskTestCaseStatus determineTestCaseStatus(Task task, TaskTestCase testCase, RemoteExecutionResponseDto executionResponse) {
        if (Boolean.TRUE.equals(executionResponse.getTimedOut())) {
            return TaskTestCaseStatus.TIMEOUT;
        }
        if (executionResponse.getExitCode() == null || executionResponse.getExitCode() != 0) {
            return TaskTestCaseStatus.RUNTIME_ERROR;
        }

        boolean isMatched = taskOutputMatcher.matches(task.getOutputMatchMode(), testCase.getExpectedOutput(), executionResponse.getStdout());

        return isMatched ? TaskTestCaseStatus.PASSED : TaskTestCaseStatus.FAILED;
    }

    private BigDecimal calculateScorePercentage(TaskGradingStrategy strategy, int passedCount, int totalCount, BigDecimal passedWeight, BigDecimal totalWeight) {
        if (totalCount == 0) {
            return BigDecimal.ZERO;
        }

        if (strategy == TaskGradingStrategy.ALL_OR_NONE) {
            return passedCount == totalCount ? BigDecimal.valueOf(100) : BigDecimal.ZERO;
        }

        if (totalWeight.compareTo(BigDecimal.ZERO) == 0) {
            return BigDecimal.ZERO;
        }

        return passedWeight.multiply(BigDecimal.valueOf(100)).divide(totalWeight, 2, RoundingMode.HALF_UP);
    }

    private void assignGradeToAnimal(Animal animal, Task task, BigDecimal scorePercentage) {
        Grade grade = gradeService.getOrCreateGrade(animal, task, "Rozwiązanie automatyczne");
        BigDecimal scoreRatio = scorePercentage.divide(BigDecimal.valueOf(100), 4, RoundingMode.HALF_UP);

        List<CriterionGrade> criteriaGrades = new ArrayList<>();
        task.getCriteria().forEach(criterion -> {
            BigDecimal gainedXp = criterion.getMaxXp().multiply(scoreRatio).setScale(1, RoundingMode.HALF_UP);
            CriterionGrade criterionGrade = criterionGradeService.fetchOrCreateCriterionGrade(
                    criterion.getId(),
                    gainedXp,
                    grade
            );
            criteriaGrades.add(criterionGrade);
        });

        grade.getCriteriaGrades().clear();
        grade.getCriteriaGrades().addAll(criteriaGrades);
        gradeService.saveGrade(grade);
        criterionGradeService.saveAll(criteriaGrades);

        bonusXpCalculator.updateAnimalFlatBonusXp(animal.getId());
        bonusXpCalculator.updateAnimalPercentageBonusXp(animal.getId());
    }

    private Integer resolveCpuLimit(Task task, TaskTestCase testCase) {
        return testCase.getTimeLimitOverrideMs() != null
                ? testCase.getTimeLimitOverrideMs()
                : task.getCpuTimeLimitMs();
    }
}
