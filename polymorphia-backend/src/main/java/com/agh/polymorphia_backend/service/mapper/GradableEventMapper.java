package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.response.page.event.CourseworkEventResponseDto;
import com.agh.polymorphia_backend.dto.response.page.event.EventChestResponseDto;
import com.agh.polymorphia_backend.dto.response.page.event.GradableEventResponseDto;
import com.agh.polymorphia_backend.dto.response.page.event.TestEventResponseDto;
import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.model.course.reward.Chest;
import com.agh.polymorphia_backend.model.event.gradable.Coursework;
import com.agh.polymorphia_backend.model.event.gradable.GradableEvent;
import com.agh.polymorphia_backend.model.event.gradable.Test;
import com.agh.polymorphia_backend.model.event.submission.CourseworkSubmission;
import com.agh.polymorphia_backend.model.grade.Grade;
import com.agh.polymorphia_backend.repository.event.submission.SubmissionRepository;
import com.agh.polymorphia_backend.service.GradeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class GradableEventMapper {
    private final SubmissionRepository submissionRepository;
    private final GradeService gradeService;

    public GradableEventResponseDto courseworkToGradableEventResponseDto(Coursework coursework, Animal animal) {
        CourseworkEventResponseDto response = new CourseworkEventResponseDto();
        response.setId(coursework.getId());
        response.setName(coursework.getName());
        response.setTopic(coursework.getTopic());
        response.setInfoUrl(coursework.getInfoUrl());
        response.setContainsExtraAssignment(coursework.getContainsExtraAssignment());
        response.setHidden(coursework.getHidden());
        response.setMaxXp(coursework.getMaxXp());

        Optional<CourseworkSubmission> courseworkSubmission = submissionRepository.findByAnimalAndCoursework(animal, coursework);

        response.setPrUrl(courseworkSubmission.map(CourseworkSubmission::getPrUrl).orElse(null));
        response.setExtraAssignmentPrUrl(courseworkSubmission.map(CourseworkSubmission::getExtraAssignmentPrUrl).orElse(null));

        return setGradeAndRewards(response, coursework, animal);
    }

    public GradableEventResponseDto testToGradableEventResponseDto(Test coursework, Animal animal) {
        TestEventResponseDto response = new TestEventResponseDto();
        response.setId(coursework.getId());
        response.setName(coursework.getName());
        response.setHidden(coursework.getHidden());
        response.setMaxXp(coursework.getMaxXp());

        return setGradeAndRewards(response, coursework, animal);
    }


    private GradableEventResponseDto setGradeAndRewards(GradableEventResponseDto response,
                                                        GradableEvent<?> gradableEvent, Animal animal) {

        Optional<Grade> gradeOptional = gradeService.getExistingGrade(gradableEvent, animal);

        if (gradeOptional.isEmpty()) {
            response.setGraded(false);
            return response;
        }

        Grade grade = gradeOptional.get();

        response.setGraded(true);
        response.setGainedXp(grade.getXp());

        List<EventChestResponseDto> chests = Optional.ofNullable(grade.getAssignedChests())
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

        response.setChests(chests);
        response.setGraded(false);


        return response;
    }


}
