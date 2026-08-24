package com.agh.polymorphia_backend.service.task.async_submission;

import com.agh.polymorphia_backend.service.task.dto.TaskSubmissionContext;
import com.agh.polymorphia_backend.service.task.async_submission.config.TaskSubmissionProperties;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Slf4j
@Component
@RequiredArgsConstructor
public class TaskSubmissionQueuePoller {

    private final TaskSubmissionPersistenceService taskSubmissionPersistenceService;
    private final TaskSubmissionProcessor taskSubmissionProcessor;
    private final ThreadPoolTaskExecutor taskSubmissionExecutor;
    private final TaskSubmissionProperties taskSubmissionProperties;

    @Scheduled(fixedDelayString = "${task.submission.poll-interval-ms:10000}")
    public void pollQueue() {
        log.info("[POOLER] started pooling");
        List<TaskSubmissionContext> claimedTaskSubmissions =
                taskSubmissionPersistenceService.claimNextTaskSubmissions(taskSubmissionProperties.batchSize());

        log.info("[POOLER] finished pooling");

        CompletableFuture.allOf(
                claimedTaskSubmissions.stream()
                        .map(this::processAsync)
                        .toArray(CompletableFuture[]::new)
        ).join();
    }

    private CompletableFuture<Void> processAsync(TaskSubmissionContext taskSubmissionContext) {
        return CompletableFuture
                .runAsync(() -> taskSubmissionProcessor.process(taskSubmissionContext), taskSubmissionExecutor)
                .exceptionally(exception -> null);
    }
}