package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.response.task.TaskDetailsResponseDto;
import com.agh.polymorphia_backend.model.gradable_event.subtypes.task.TaskExecutionMode;
import com.agh.polymorphia_backend.service.task.TaskService;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class TaskControllerTest {

    @Test
    void shouldReturnExecutionModesWithCacheControl() {
        TaskService taskService = new TaskService(null, null, null, null, null) {
            @Override
            public List<TaskExecutionMode> getExecutionModes() {
                return List.of(TaskExecutionMode.values());
            }
        };

        TaskController controller = new TaskController(taskService, null, null);
        ResponseEntity<List<TaskExecutionMode>> response = controller.getExecutionModes();

        assertThat(response.getStatusCode().value()).isEqualTo(200);
        assertThat(response.getBody()).containsExactly(
                TaskExecutionMode.RANDOM,
                TaskExecutionMode.PLAIN_PROCESS,
                TaskExecutionMode.DOCKER
        );
        assertThat(response.getHeaders().getCacheControl()).contains("max-age=600, must-revalidate");
    }

    @Test
    void shouldReturnTaskDetailsWithPrivateCacheControl() {
        TaskService taskService = new TaskService(null, null, null, null, null) {
            @Override
            public TaskDetailsResponseDto getTaskDetails(Long taskId) {
                return TaskDetailsResponseDto.builder().build();
            }
        };

        TaskController controller = new TaskController(taskService, null, null);
        var response = controller.getTaskDetails(1L);

        assertThat(response.getStatusCode().value()).isEqualTo(200);
        assertThat(response.getHeaders().getCacheControl()).contains("max-age=120");
    }
}
