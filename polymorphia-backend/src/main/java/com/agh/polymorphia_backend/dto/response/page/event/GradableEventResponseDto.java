package com.agh.polymorphia_backend.dto.response.page.event;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@SuperBuilder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class GradableEventResponseDto {
    @NotNull
    private Long id;

    @NotEmpty
    private String name;

    @NotNull
    private Integer maxXp;

    private Integer gainedXp = 0;

    private Integer flatBonusXp = 0;

    private Integer totalXp = 0;

    @NotNull
    private Boolean graded;

    @NotNull
    private List<EventChestResponseDto> chests;
}
