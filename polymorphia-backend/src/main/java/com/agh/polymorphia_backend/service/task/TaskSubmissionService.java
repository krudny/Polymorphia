package com.agh.polymorphia_backend.service.task;

import com.agh.polymorphia_backend.dto.request.task.ExecuteTaskRequestDto;
import com.agh.polymorphia_backend.dto.response.task.ExecuteTaskResponseDto;
import com.agh.polymorphia_backend.dto.response.task.SubmitTaskResponseDto;
import com.agh.polymorphia_backend.dto.response.task.TaskSubmissionStatusResponseDto;
import org.springframework.stereotype.Component;

@Component
public class TaskSubmissionService {

    public ExecuteTaskResponseDto runTask(Long id, ExecuteTaskRequestDto request) {

    }

    public SubmitTaskResponseDto submitTask(Long id, ExecuteTaskRequestDto request) {

    }

    public TaskSubmissionStatusResponseDto getTaskStatus(Long id, Long submissionId) {

    }
}
