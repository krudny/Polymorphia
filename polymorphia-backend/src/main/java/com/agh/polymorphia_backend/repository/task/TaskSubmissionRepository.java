package com.agh.polymorphia_backend.repository.task;

import com.agh.polymorphia_backend.model.gradable_event.subtypes.task.TaskSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskSubmissionRepository extends JpaRepository<TaskSubmission, Long> {
    Integer countByTaskIdAndAnimalId(Long taskId, Long animalId);
}
