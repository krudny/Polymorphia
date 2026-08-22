package com.agh.polymorphia_backend.service.task;

import com.agh.polymorphia_backend.model.gradable_event.subtypes.task.TaskTestCaseStatus;

import java.math.BigDecimal;

public record TaskTestCaseOutcome(
    Long testCaseId,
    TaskTestCaseStatus status,
    String stdout,
    String stderr,
    Integer exitCode,
    Integer executionTimeMs,
    BigDecimal weight
) {}
