package com.agh.polymorphia_backend.dto.response.event.gradable;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class GradableEventShortResponseDto {
    @NotNull
    private Long id;

    @NotEmpty
    private String name;

    private String topic;
}
