package com.agh.polymorphia_backend.repository.task;

import com.agh.polymorphia_backend.model.gradable_event.subtypes.task.TaskStarterCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskStarterCodeRepository extends JpaRepository<TaskStarterCode, Long> {
}
