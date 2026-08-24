package com.agh.polymorphia_backend.service.task.async_submission;

import com.agh.polymorphia_backend.model.gradable_event.subtypes.task.TaskSubmission;
import com.agh.polymorphia_backend.model.gradable_event.subtypes.task.TaskSubmissionResult;
import com.agh.polymorphia_backend.model.gradable_event.subtypes.task.TaskSubmissionStatus;
import com.agh.polymorphia_backend.model.gradable_event.subtypes.task.TaskTestCase;
import com.agh.polymorphia_backend.model.gradable_event.subtypes.task.TaskTestCaseStatus;
import com.agh.polymorphia_backend.repository.task.TaskSubmissionRepository;
import com.agh.polymorphia_backend.repository.task.TaskSubmissionResultRepository;
import com.agh.polymorphia_backend.repository.task.TaskTestCaseRepository;
import com.agh.polymorphia_backend.service.task.dto.TaskSubmissionContext;
import com.agh.polymorphia_backend.service.task.dto.TaskTestCaseOutcome;
import com.agh.polymorphia_backend.service.task.dto.TaskTestCaseSpec;
import com.agh.polymorphia_backend.service.task.async_submission.config.TaskSubmissionProperties;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class TaskSubmissionPersistenceService {

    private final TaskSubmissionRepository taskSubmissionRepository;
    private final TaskSubmissionResultRepository taskSubmissionResultRepository;
    private final TaskTestCaseRepository taskTestCaseRepository;
    private final TaskSubmissionScoreCalculator taskSubmissionScoreCalculator;
    private final TaskSubmissionProperties taskSubmissionProperties;

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<TaskSubmissionContext> claimNextTaskSubmissions(int batchSize) {
        List<TaskSubmission> claimedTaskSubmissions =
                taskSubmissionRepository.findNextQueuedTaskSubmissionsWithLock(batchSize);

        Instant now = Instant.now();
        Instant lockedUntil = now.plusSeconds(taskSubmissionProperties.leaseDurationSeconds());

        List<TaskSubmissionContext> contexts = new ArrayList<>();

        for (TaskSubmission taskSubmission : claimedTaskSubmissions) {
            taskSubmission.setStatus(TaskSubmissionStatus.RUNNING);
            taskSubmission.setStartedAt(now);
            taskSubmission.setLockedUntil(lockedUntil);
            taskSubmission.setProcessingAttempts(taskSubmission.getProcessingAttempts() + 1);

            List<TaskTestCase> testCases =
                    taskTestCaseRepository.findByTaskId(taskSubmission.getTask().getId());

            List<TaskTestCaseSpec> testCaseSpecs = testCases.stream()
                    .map(testCase -> TaskTestCaseSpec.of(taskSubmission.getTask(), testCase))
                    .toList();

            TaskSubmissionContext taskSubmissionContext = new TaskSubmissionContext(
                    taskSubmission.getId(),
                    taskSubmission.getTask().getId(),
                    taskSubmission.getAnimal().getId(),
                    taskSubmission.getLanguage(),
                    taskSubmission.getSourceCode(),
                    taskSubmission.getTask().getOutputMatchMode(),
                    taskSubmission.getTask().getGradingStrategy(),
                    testCaseSpecs
            );

            contexts.add(taskSubmissionContext);
        }

        taskSubmissionRepository.saveAll(claimedTaskSubmissions);
        return contexts;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void saveResultsAndComplete(
            TaskSubmissionContext taskSubmissionContext,
            List<TaskTestCaseOutcome> outcomes
    ) {
        taskSubmissionResultRepository.deleteByTaskSubmissionId(taskSubmissionContext.taskSubmissionId());

        TaskSubmission taskSubmissionProxy =
                taskSubmissionRepository.getReferenceById(taskSubmissionContext.taskSubmissionId());

        List<TaskSubmissionResult> results = outcomes.stream()
                .map(outcome -> {
                    TaskTestCase testCaseProxy =
                            taskTestCaseRepository.getReferenceById(outcome.testCaseId());
                    return TaskSubmissionResult.builder()
                            .submission(taskSubmissionProxy)
                            .testCase(testCaseProxy)
                            .status(outcome.status())
                            .stdout(outcome.stdout())
                            .stderr(outcome.stderr())
                            .exitCode(outcome.exitCode())
                            .executionTimeMs(outcome.executionTimeMs())
                            .build();
                })
                .toList();

        taskSubmissionResultRepository.saveAll(results);

        int passedCount = 0;
        int totalCount = outcomes.size();
        BigDecimal passedWeight = BigDecimal.ZERO;
        BigDecimal totalWeight = BigDecimal.ZERO;

        for (TaskTestCaseOutcome outcome : outcomes) {
            totalWeight = totalWeight.add(outcome.weight());
            if (outcome.status() == TaskTestCaseStatus.PASSED) {
                passedCount++;
                passedWeight = passedWeight.add(outcome.weight());
            }
        }

        BigDecimal scorePercentage = taskSubmissionScoreCalculator.calculateScorePercentage(
                taskSubmissionContext.gradingStrategy(),
                passedCount,
                totalCount,
                passedWeight,
                totalWeight
        );

        TaskSubmission taskSubmission = taskSubmissionRepository.findById(taskSubmissionContext.taskSubmissionId())
                .orElse(null);

        if (taskSubmission != null) {
            taskSubmission.setPassedWeight(passedWeight);
            taskSubmission.setTotalWeight(totalWeight);
            taskSubmission.setPassedCount(passedCount);
            taskSubmission.setTotalCount(totalCount);
            taskSubmission.setScore(scorePercentage);
            taskSubmission.setStatus(TaskSubmissionStatus.COMPLETED);
            taskSubmission.setFinishedAt(Instant.now());
            taskSubmission.setLockedUntil(null);
            taskSubmissionRepository.save(taskSubmission);
        }
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void markFailed(Long taskSubmissionId) {
        TaskSubmission taskSubmission = taskSubmissionRepository.findById(taskSubmissionId).orElse(null);
        if (taskSubmission != null) {
            taskSubmission.setStatus(TaskSubmissionStatus.INTERNAL_ERROR);
            taskSubmission.setErrorMessage("Wystąpił błąd podczas sprawdzania rozwiązania.");
            taskSubmission.setFinishedAt(Instant.now());
            taskSubmission.setLockedUntil(null);
            taskSubmissionRepository.save(taskSubmission);
        }
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void markGraded(Long taskSubmissionId) {
        TaskSubmission taskSubmission = taskSubmissionRepository.findById(taskSubmissionId).orElse(null);
        if (taskSubmission != null) {
            taskSubmission.setIsGraded(true);
            taskSubmissionRepository.save(taskSubmission);
        }
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void requeueExpired() {
        Instant now = Instant.now();
        log.warn("REAPER");
        List<TaskSubmission> expiredSubmissions =
                taskSubmissionRepository.findExpiredRunningTaskSubmissions(TaskSubmissionStatus.RUNNING, now);

        for (TaskSubmission taskSubmission : expiredSubmissions) {
            if (taskSubmission.getProcessingAttempts() < taskSubmissionProperties.maxProcessingAttempts()) {
                taskSubmission.setStatus(TaskSubmissionStatus.QUEUED);
            } else {
                taskSubmission.setStatus(TaskSubmissionStatus.INTERNAL_ERROR);
                taskSubmission.setErrorMessage("Nie udało się sprawdzić rozwiązania. Skontaktuj się z prowadzącym.");
                taskSubmission.setFinishedAt(now);
            }
            taskSubmission.setLockedUntil(null);
        }

        taskSubmissionRepository.saveAll(expiredSubmissions);
    }

    @Transactional(readOnly = true)
    public List<Long> findUnfinishedGradingTaskSubmissionIds(Instant threshold) {
        return taskSubmissionRepository.findUnfinishedGradingTaskSubmissionIds(
                TaskSubmissionStatus.COMPLETED,
                threshold
        );
    }
}
