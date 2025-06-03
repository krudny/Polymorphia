package com.agh.polymorphia_backend.dto.response.event.gradable.grade;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GradeResponseDto {

    private Float gainedXp;

    private ZonedDateTime createdDate;

    private ZonedDateTime modifiedDate;

    @NotNull
    private List<EventChestResponseDto> chests;
}
