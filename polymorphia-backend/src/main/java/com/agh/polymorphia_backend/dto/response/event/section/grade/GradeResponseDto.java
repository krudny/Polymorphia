package com.agh.polymorphia_backend.dto.response.event.section.grade;

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

    private Integer gainedXp;

    private Integer flatBonusXp = 0;

    private Integer totalXp = 0;

    private ZonedDateTime createdDate;

    private ZonedDateTime modifiedDate;

    @NotNull
    private List<EventChestResponseDto> chests;
}
