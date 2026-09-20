package com.agh.polymorphia_backend.service.task;

import com.agh.polymorphia_backend.model.gradable_event.subtypes.task.Task;
import com.agh.polymorphia_backend.model.gradable_event.subtypes.task.TaskExecutionMode;
import com.agh.polymorphia_backend.model.gradable_event.subtypes.task.TaskSupportedLanguage;
import com.agh.polymorphia_backend.repository.task.TaskAllowedLanguageRepository;
import com.agh.polymorphia_backend.repository.task.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final TaskAllowedLanguageRepository taskAllowedLanguageRepository;

    public List<TaskExecutionMode> getExecutionModes() {
        return List.of(TaskExecutionMode.values());
    }

    @Transactional(readOnly = true)
    public Task getTask(Long taskId) {
        return taskRepository.findById(taskId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Nie znaleziono zadania."));
    }

    public void validateTaskLanguage(Long taskId, TaskSupportedLanguage language) {
        boolean languageAllowed = taskAllowedLanguageRepository.existsByTaskIdAndLanguage(taskId, language);

        if (!languageAllowed) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Zadanie nie może być uruchomione w tym języku.");
        }
    }
}
