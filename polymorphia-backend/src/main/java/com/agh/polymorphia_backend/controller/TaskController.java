package com.agh.polymorphia_backend.controller;


import com.agh.polymorphia_backend.dto.request.task.ExecuteTaskRequestDto;
import com.agh.polymorphia_backend.dto.response.task.ExecuteTaskResponseDto;
import com.agh.polymorphia_backend.dto.response.task.SubmitTaskResponseDto;
import com.agh.polymorphia_backend.dto.response.task.TaskDetailsResponseDto;
import com.agh.polymorphia_backend.dto.response.task.TaskSubmissionStatusResponseDto;
import com.agh.polymorphia_backend.service.task.TaskService;
import com.agh.polymorphia_backend.service.task.TaskSubmissionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;
    private final TaskSubmissionService taskSubmissionService;

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('STUDENT', 'INSTRUCTOR', 'COORDINATOR')")
    public TaskDetailsResponseDto getTaskDetails(@PathVariable Long id) {
        return taskService.getTaskDetails(id);
    }

    @PostMapping("/{id}/run")
    @PreAuthorize("hasAnyAuthority('STUDENT', 'INSTRUCTOR', 'COORDINATOR')")
    public ExecuteTaskResponseDto runCode(@PathVariable Long id,
                                          @Valid @RequestBody ExecuteTaskRequestDto request) {
        return taskSubmissionService.runTask(id, request);
    }

    @PostMapping("/{id}/submissions")
    @ResponseStatus(HttpStatus.ACCEPTED)
    @PreAuthorize("hasAnyAuthority('STUDENT', 'INSTRUCTOR', 'COORDINATOR')")
    public SubmitTaskResponseDto submit(@PathVariable Long id,
                                        @Valid @RequestBody ExecuteTaskRequestDto request) {
        return taskSubmissionService.submitTask(id, request);
    }

    @GetMapping("/{id}/submissions/{submissionId}")
    @PreAuthorize("hasAnyAuthority('STUDENT', 'INSTRUCTOR', 'COORDINATOR')")
    public TaskSubmissionStatusResponseDto getSubmissionStatus(@PathVariable Long id,
                                                               @PathVariable Long submissionId) {
        return taskSubmissionService.getTaskStatus(id, submissionId);
    }
}