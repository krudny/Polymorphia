package com.agh.polymorphia_backend.service.task.dto;

import com.agh.polymorphia_backend.model.gradable_event.subtypes.task.TaskGradingStrategy;
import com.agh.polymorphia_backend.model.gradable_event.subtypes.task.TaskOutputMatchMode;
import com.agh.polymorphia_backend.model.gradable_event.subtypes.task.TaskSupportedLanguage;

import java.util.List;

public record TaskSubmissionContext(
    Long taskSubmissionId,
    Long taskId,
    Long animalId,
    TaskSupportedLanguage language,
    String sourceCode,
    TaskOutputMatchMode outputMatchMode,
    TaskGradingStrategy gradingStrategy,
    List<TaskTestCaseSpec> testCases
) {}
