package com.agh.polymorphia_backend.service.mapper.gradable;

import com.agh.polymorphia_backend.dto.response.event.section.GradableEventResponseDto;
import com.agh.polymorphia_backend.dto.response.event.section.grade.EventChestResponseDto;
import com.agh.polymorphia_backend.dto.response.event.section.grade.GradeResponseDto;
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
                                                          GradableEvent<?> gradableEvent, Animal animal) {

        Optional<Grade> gradeOptional = gradeService.getExistingGrade(gradableEvent, animal);
        GradeResponseDto grade = new GradeResponseDto();
        event.setGrade(grade);

        if (gradeOptional.isEmpty()) {
            event.setGraded(false);
            return event;
        }

        Grade fetchedGrade = gradeOptional.get();
        List<EventChestResponseDto> chests = getGradeChests(fetchedGrade);

        event.setGraded(true);

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
                                    .name(chest.getName())
                                    .imageUrl(chest.getImageUrl())
                                    .opened(assignedChest.getOpened())
                                    .build();
                        }
                )
                .toList();
    }
}
