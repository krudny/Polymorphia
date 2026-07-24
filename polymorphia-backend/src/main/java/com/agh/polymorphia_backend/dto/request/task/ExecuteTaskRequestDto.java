package com.agh.polymorphia_backend.dto.request.task;

import com.agh.polymorphia_backend.model.gradable_event.subtypes.task.TaskSupportedLanguage;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ExecuteTaskRequestDto {
    @NotNull
    private TaskSupportedLanguage language;

    @NotBlank
    private String sourceCode;
}