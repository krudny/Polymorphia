package com.agh.polymorphia_backend.service.mapper.gradable;

import com.agh.polymorphia_backend.dto.response.event.gradable.GradableEventResponseDto;
import com.agh.polymorphia_backend.dto.response.event.gradable.GradableEventShortResponseDto;
import com.agh.polymorphia_backend.dto.response.event.gradable.grade.EventChestResponseDto;
import com.agh.polymorphia_backend.dto.response.event.gradable.grade.GradeResponseDto;
import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.model.course.reward.Chest;
import com.agh.polymorphia_backend.model.event.gradable.GradableEvent;
import com.agh.polymorphia_backend.model.grade.Grade;
import com.agh.polymorphia_backend.service.GradeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public abstract class GradableEventMapper {
    private final GradeService gradeService;

    protected GradableEventResponseDto setGradeAndRewards(GradableEventResponseDto event,
                                                          GradableEvent<?> gradableEvent,
                                                          Animal animal) {

        Optional<Grade> gradeOptional = gradeService.getExistingGrade(gradableEvent, animal);

        if (gradeOptional.isEmpty()) {
            return event;
        }

        GradeResponseDto grade = new GradeResponseDto();
        event.setGrade(grade);

        Grade fetchedGrade = gradeOptional.get();
        List<EventChestResponseDto> chests = getGradeChests(fetchedGrade);

        grade.setGainedXp(fetchedGrade.getXp());
        grade.setCreatedDate(fetchedGrade.getCreatedDate());
        grade.setModifiedDate(fetchedGrade.getModifiedDate());
        grade.setChests(chests);


        return event;
    }

    private List<EventChestResponseDto> getGradeChests(Grade grade) {
        return Optional.ofNullable(grade.getAssignedChests())
                .orElse(Collections.emptySet())
                .stream()
                .map(assignedChest -> {
                            Chest chest = assignedChest.getChest();
                            return EventChestResponseDto.builder()
                                    .id(chest.getId())
                                    .assignedChestId(assignedChest.getId())
                                    .name(chest.getName())
                                    .imageUrl(chest.getImageUrl())
                                    .receivedDate(assignedChest.getReceivedDate())
                                    .opened(assignedChest.getOpened())
                                    .build();
                        }
                )
                .toList();
    }

    public abstract GradableEventResponseDto toGradableEventResponseDto(GradableEvent<?> gradableEvent, Animal animal);

    public abstract GradableEventShortResponseDto toShortResponseDto(GradableEvent<?> gradableEvent, Animal animal);
}
