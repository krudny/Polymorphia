package com.agh.polymorphia_backend.repository.task;

import com.agh.polymorphia_backend.model.gradable_event.subtypes.task.TaskAllowedLanguage;
import com.agh.polymorphia_backend.model.gradable_event.subtypes.task.TaskSupportedLanguage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Set;

public interface TaskAllowedLanguageRepository extends JpaRepository<TaskAllowedLanguage, Long> {

    @Query("""
            SELECT language
            FROM TaskAllowedLanguage
            WHERE task.id = :taskId
            """)
    Set<TaskSupportedLanguage> findLanguagesByTaskId(@Param("taskId") Long taskId);
}
