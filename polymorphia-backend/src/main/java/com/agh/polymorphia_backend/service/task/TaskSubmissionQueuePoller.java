package com.agh.polymorphia_backend.service.task;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Component
@RequiredArgsConstructor
public class TaskSubmissionQueuePoller {

    private final TaskSubmissionPersistenceService taskSubmissionPersistenceService;
    private final TaskSubmissionExecutionService taskSubmissionExecutionService;
    private final TaskSubmissionErrorMapper taskSubmissionErrorMapper;
    private final TaskSubmissionGradingService taskSubmissionGradingService;

    @Value("${task.submission.batch-size:10}")
    private int batchSize;

    @Scheduled(fixedDelayString = "${task.submission.poll-interval-ms:1000}")
    public void pollQueue() {
        List<TaskSubmissionContext> claimedContexts =
                taskSubmissionPersistenceService.claimNextTaskSubmissions(batchSize);

        for (TaskSubmissionContext taskSubmissionContext : claimedContexts) {
            processTaskSubmission(taskSubmissionContext);
        }
    }

    @Scheduled(fixedDelayString = "${task.submission.reaper-interval-ms:60000}")
    public void reapExpiredTaskSubmissions() {
        taskSubmissionPersistenceService.requeueExpired();

        Instant threshold = Instant.now().minus(1, ChronoUnit.MINUTES);
        List<Long> uncompletedGradingTaskSubmissionIds =
                taskSubmissionPersistenceService.findUnfinishedGradingTaskSubmissionIds(threshold);

        for (Long taskSubmissionId : uncompletedGradingTaskSubmissionIds) {
            try {
                taskSubmissionGradingService.applyGrade(taskSubmissionId);
                taskSubmissionPersistenceService.markGraded(taskSubmissionId);
            } catch (Exception exception) {
                // Status pozostaje COMPLETED, graded = false. Reaper ponowi w kolejnym cyklu.
            }
        }
    }

    private void processTaskSubmission(TaskSubmissionContext taskSubmissionContext) {
        try {
            List<TaskTestCaseOutcome> outcomes =
                    taskSubmissionExecutionService.run(taskSubmissionContext);
            taskSubmissionPersistenceService.saveResultsAndComplete(
                    taskSubmissionContext,
                    outcomes
            );
        } catch (Exception exception) {
            taskSubmissionPersistenceService.markFailed(
                    taskSubmissionContext.taskSubmissionId(),
                    taskSubmissionErrorMapper.toUserMessage(exception)
            );
            return;
        }

        try {
            taskSubmissionGradingService.applyGrade(
                    taskSubmissionContext.taskSubmissionId()
            );
            taskSubmissionPersistenceService.markGraded(
                    taskSubmissionContext.taskSubmissionId()
            );
        } catch (Exception exception) {
            // Status pozostaje COMPLETED, graded = false. Reaper ponowi naliczanie oceny.
        }
    }
}
