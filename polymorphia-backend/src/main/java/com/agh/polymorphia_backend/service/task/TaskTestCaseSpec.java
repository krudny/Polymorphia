package com.agh.polymorphia_backend.service.task;

import com.agh.polymorphia_backend.model.gradable_event.subtypes.task.Task;
import com.agh.polymorphia_backend.model.gradable_event.subtypes.task.TaskTestCase;

import java.math.BigDecimal;

public record TaskTestCaseSpec(
    Long testCaseId,
    String input,
    String expectedOutput,
    BigDecimal weight,
    TaskLimits limits
) {

  public static TaskTestCaseSpec of(Task task, TaskTestCase testCase) {
    BigDecimal weight = testCase.getWeight() != null
        ? testCase.getWeight()
        : BigDecimal.ONE;

    return new TaskTestCaseSpec(
        testCase.getId(),
        testCase.getInput(),
        testCase.getExpectedOutput(),
        weight,
        TaskLimits.of(task, testCase)
    );
  }
}