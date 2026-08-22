package com.agh.polymorphia_backend.repository.task;

import com.agh.polymorphia_backend.model.gradable_event.subtypes.task.TaskSubmission;
import com.agh.polymorphia_backend.model.gradable_event.subtypes.task.TaskSubmissionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

@Repository
public interface TaskSubmissionRepository extends JpaRepository<TaskSubmission, Long> {

    int countByTaskIdAndAnimalId(Long taskId, Long animalId);

    @Query(value = """
        SELECT * FROM task_submissions
        WHERE status = 'QUEUED'
        ORDER BY created_date
        LIMIT :batchSize
        FOR UPDATE SKIP LOCKED
        """, nativeQuery = true)
    List<TaskSubmission> findNextQueuedTaskSubmissionsWithLock(@Param("batchSize") int batchSize);

    @Query("""
        SELECT taskSubmission FROM TaskSubmission taskSubmission
        WHERE taskSubmission.status = :status
          AND taskSubmission.lockedUntil < :now
        """)
    List<TaskSubmission> findExpiredRunningTaskSubmissions(
            @Param("status") TaskSubmissionStatus status,
            @Param("now") Instant now
    );

    @Query("""
        SELECT taskSubmission.id FROM TaskSubmission taskSubmission
        WHERE taskSubmission.status = :status
          AND taskSubmission.isGraded = false
          AND taskSubmission.finishedAt < :threshold
        """)
    List<Long> findUnfinishedGradingTaskSubmissionIds(
            @Param("status") TaskSubmissionStatus status,
            @Param("threshold") Instant threshold
    );
}
