package com.agh.polymorphia_backend.dto.request.course_import;

import com.agh.polymorphia_backend.dto.request.course_import.event_section.EventSectionDetailsRequestDto;
import com.agh.polymorphia_backend.dto.request.course_import.reward.ChestDetailsRequestDto;
import com.agh.polymorphia_backend.dto.request.course_import.reward.ItemDetailsRequestDto;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class CourseDetailsRequestDto {
    @NotEmpty
    @EqualsAndHashCode.Include
    private String name;

    @EqualsAndHashCode.Include
    private String markdownSourceUrl;

    @NotNull
    private List<EvolutionStageDetailsRequestDto> evolutionStages;

    @NotNull
    private List<EventSectionDetailsRequestDto> eventSections;

    @NotNull
    private List<ItemDetailsRequestDto> items;

    @NotNull
    private List<ChestDetailsRequestDto> chests;

    @NotNull
    private List<String> roadmapOrderKeys;
}
