package com.agh.polymorphia_backend.repository.task;

import com.agh.polymorphia_backend.model.gradable_event.subtypes.task.TaskSubmissionResult;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskSubmissionResultRepository extends JpaRepository<TaskSubmissionResult, Long> {
}
