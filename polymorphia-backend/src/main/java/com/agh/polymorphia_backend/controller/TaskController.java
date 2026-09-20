package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.request.task.ExecuteTaskRequestDto;
import com.agh.polymorphia_backend.dto.response.task.ExecuteTaskResponseDto;
import com.agh.polymorphia_backend.dto.response.task.SubmitTaskResponseDto;
import com.agh.polymorphia_backend.dto.response.task.TaskDetailsResponseDto;
import com.agh.polymorphia_backend.dto.response.task.TaskSubmissionStatusResponseDto;
import com.agh.polymorphia_backend.service.task.TaskDetailsService;
import com.agh.polymorphia_backend.service.task.TaskRunService;
import com.agh.polymorphia_backend.service.task.TaskService;
import com.agh.polymorphia_backend.service.task.TaskSubmissionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import com.agh.polymorphia_backend.model.gradable_event.subtypes.task.TaskExecutionMode;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.util.List;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;
    private final TaskDetailsService taskDetailsService;
    private final TaskRunService taskRunService;
    private final TaskSubmissionService taskSubmissionService;

    @GetMapping("/execution-modes")
    @PreAuthorize("hasAnyAuthority('STUDENT', 'INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<List<TaskExecutionMode>> getExecutionModes() {
        return ResponseEntity.ok()
                .cacheControl(CacheControl.maxAge(Duration.ofMinutes(10)).mustRevalidate())
                .body(taskService.getExecutionModes());
    }

    @GetMapping("/{taskId}")
    @PreAuthorize("hasAnyAuthority('STUDENT', 'INSTRUCTOR', 'COORDINATOR')")
    public ResponseEntity<TaskDetailsResponseDto> getTaskDetails(@PathVariable Long taskId) {
        return ResponseEntity.ok()
                .cacheControl(CacheControl.maxAge(Duration.ofMinutes(2)).cachePrivate())
                .body(taskDetailsService.getTaskDetails(taskId));
    }

    @PostMapping("/{taskId}/run")
    @PreAuthorize("hasAnyAuthority('STUDENT', 'INSTRUCTOR', 'COORDINATOR')")
    public ExecuteTaskResponseDto runCode(@PathVariable Long taskId,
                                          @Valid @RequestBody ExecuteTaskRequestDto request) {
        return taskRunService.runTask(taskId, request);
    }

    @PostMapping("/{taskId}/submissions")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @PreAuthorize("hasAnyAuthority('STUDENT')")
    public SubmitTaskResponseDto submit(@PathVariable Long taskId,
                                        @Valid @RequestBody ExecuteTaskRequestDto request) {
        return taskSubmissionService.submitTask(taskId, request);
    }

    @GetMapping("/{taskId}/submissions/{submissionId}")
    @PreAuthorize("hasAnyAuthority('STUDENT', 'INSTRUCTOR', 'COORDINATOR')")
    public TaskSubmissionStatusResponseDto getSubmissionStatus(@PathVariable Long taskId,
                                                               @PathVariable("submissionId") Long taskSubmissionId) {
        return taskSubmissionService.getTaskStatus(taskId, taskSubmissionId);
    }
}