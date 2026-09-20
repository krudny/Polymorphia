package com.agh.polymorphia_backend.service.task;

import com.agh.polymorphia_backend.dto.response.task.TaskAllowedLanguageDto;
import com.agh.polymorphia_backend.dto.response.task.TaskDetailsResponseDto;
import com.agh.polymorphia_backend.dto.response.task.TaskTestCaseDto;
import com.agh.polymorphia_backend.repository.task.TaskAllowedLanguageRepository;
import com.agh.polymorphia_backend.repository.task.TaskRepository;
import com.agh.polymorphia_backend.repository.task.TaskTestCaseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskDetailsCacheService {

    private final TaskRepository taskRepository;
    private final TaskAllowedLanguageRepository taskAllowedLanguageRepository;
    private final TaskTestCaseRepository taskTestCaseRepository;

    @Cacheable(value = "taskDetails", key = "#taskId")
    @Transactional(readOnly = true)
    public TaskDetailsResponseDto getCachedTaskDetails(Long taskId) {
        if (!taskRepository.existsById(taskId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Nie znaleziono zadania.");
        }

        List<TaskAllowedLanguageDto> allowedLanguages =
                taskAllowedLanguageRepository.findAllowedLanguagesWithDetailsByTaskId(taskId).stream()
                        .map(projection -> TaskAllowedLanguageDto.builder()
                                .taskLanguage(projection.getLanguage())
                                .isDefault(projection.getIsDefault())
                                .sampleCode(projection.getSampleCode())
                                .build())
                        .collect(Collectors.toList());

        List<TaskTestCaseDto> testCases = taskTestCaseRepository.findVisibleByTaskId(taskId).stream()
                .map(testCase -> TaskTestCaseDto.builder()
                        .name(testCase.getName())
                        .orderIndex(testCase.getOrderIndex())
                        .input(testCase.getInput())
                        .expectedOutput(testCase.getExpectedOutput())
                        .build())
                        .collect(Collectors.toList());

        return TaskDetailsResponseDto.builder()
                .allowedLanguages(allowedLanguages)
                .testCases(testCases)
                .build();
    }
}
