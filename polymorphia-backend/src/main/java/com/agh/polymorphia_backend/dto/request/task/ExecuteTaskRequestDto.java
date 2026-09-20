package com.agh.polymorphia_backend.dto.request.task;

import com.agh.polymorphia_backend.model.gradable_event.subtypes.task.TaskExecutionMode;
import com.agh.polymorphia_backend.model.gradable_event.subtypes.task.TaskSupportedLanguage;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ExecuteTaskRequestDto {
    @NotNull
    private TaskSupportedLanguage taskLanguage;

    @NotNull(message = "Tryb uruchomienia kodu nie może być pusty.")
    private TaskExecutionMode executionMode;

    @NotBlank
    @Size(max = 64000, message = "Kod źródłowy jest zbyt długi.")
    private String sourceCode;
}