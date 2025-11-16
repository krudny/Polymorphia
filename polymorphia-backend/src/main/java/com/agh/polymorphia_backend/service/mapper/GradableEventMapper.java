package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.response.event.BaseGradableEventResponseDto;
import com.agh.polymorphia_backend.dto.response.event.InstructorGradableEventResponseDto;
import com.agh.polymorphia_backend.dto.response.event.StudentGradableEventResponseDto;
import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import com.agh.polymorphia_backend.repository.gradable_event.projections.InstructorGradableEventProjection;
import com.agh.polymorphia_backend.repository.gradable_event.projections.StudentGradableEventProjection;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class GradableEventMapper {
    private static final String mockedTitle = "*********";
    private static final String mockedTopic = "[Wydarzenie ukryte]";

    public BaseGradableEventResponseDto toBaseGradableEventResponse(GradableEvent gradableEvent) {
        return BaseGradableEventResponseDto.builder()
                .id(gradableEvent.getId())
                .name(Boolean.TRUE.equals(gradableEvent.getIsLocked()) ? mockedTitle : gradableEvent.getName())
                .topic(Boolean.TRUE.equals(gradableEvent.getIsLocked()) ? mockedTopic : gradableEvent.getTopic())
                .orderIndex(gradableEvent.getOrderIndex())
                .roadMapOrderIndex(gradableEvent.getRoadMapOrderIndex())
                .isLocked(gradableEvent.getIsLocked())
                .build();
    }

    public StudentGradableEventResponseDto toStudentGradableEventResponseDto(StudentGradableEventProjection projection) {
        return StudentGradableEventResponseDto.builder()
                .id(projection.getId())
                .name(Boolean.TRUE.equals(projection.getIsLocked()) ? mockedTitle : projection.getName())
                .topic(Boolean.TRUE.equals(projection.getIsLocked()) ? mockedTopic : projection.getTopic())
                .orderIndex(projection.getOrderIndex())
                .roadMapOrderIndex(projection.getRoadMapOrderIndex())
                .isLocked(projection.getIsLocked())
                .gainedXp(projection.getGainedXp())
                .hasPossibleReward(projection.getHasPossibleReward())
                .isGraded(projection.getIsGraded())
                .isRewardAssigned(projection.getIsRewardAssigned())
                .build();
    }

    public InstructorGradableEventResponseDto toInstructorGradableEventResponseDto(InstructorGradableEventProjection projection) {
        return InstructorGradableEventResponseDto.builder()
                .id(projection.getId())
                .name(projection.getName())
                .topic(projection.getTopic())
                .orderIndex(projection.getOrderIndex())
                .roadMapOrderIndex(projection.getRoadMapOrderIndex())
                .isHidden(projection.getIsHidden())
                .ungradedStudents(projection.getUngradedStudents())
                .isLocked(projection.getIsLocked())
                .hasPossibleReward(projection.getHasPossibleReward())
                .build();
    }
}
