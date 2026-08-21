package com.agh.polymorphia_backend.repository.task;

import com.agh.polymorphia_backend.model.gradable_event.subtypes.task.TaskSubmissionResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TaskSubmissionResultRepository extends JpaRepository<TaskSubmissionResult, Long> {
    @Query("""
            SELECT taskSubmissionResult
            FROM TaskSubmissionResult taskSubmissionResult
            WHERE taskSubmissionResult.submission.id = :submissionId
              AND taskSubmissionResult.testCase.isVisible = true
            ORDER BY taskSubmissionResult.testCase.orderIndex ASC
            """)
    List<TaskSubmissionResult> findVisibleResultsBySubmissionId(@Param("submissionId") Long submissionId);
}
