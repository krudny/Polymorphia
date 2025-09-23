package com.agh.polymorphia_backend.dto.response.reward.assignment_details;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

import java.time.ZonedDateTime;

@SuperBuilder
@Getter
public class BaseRewardAssignmentDetailsResponseDto {

    @NotNull
    private Long id;

    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy")
    private ZonedDateTime receivedDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy")
    private ZonedDateTime usedDate;


    @NotNull
    private Boolean isUsed;
}
