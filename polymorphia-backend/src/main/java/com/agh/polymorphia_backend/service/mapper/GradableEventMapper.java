package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.response.event.BaseGradableEventResponseDto;
import com.agh.polymorphia_backend.dto.response.event.InstructorGradableEventResponseDto;
import com.agh.polymorphia_backend.dto.response.event.StudentGradableEventResponseDto;
import com.agh.polymorphia_backend.model.event_section.EventSectionType;
import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import com.agh.polymorphia_backend.repository.gradable_event.projections.InstructorGradableEventProjection;
import com.agh.polymorphia_backend.repository.gradable_event.projections.StudentGradableEventProjection;
import com.agh.polymorphia_backend.util.NumberFormatter;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.function.Function;

@Service
@AllArgsConstructor
@Slf4j
public class GradableEventMapper {
    private static final String mockedTitle = "*********";
    private static final String mockedTopic = "[Wydarzenie ukryte]";

    public StudentGradableEventResponseDto toStudentGradableEventResponseDto(
            StudentGradableEventProjection projection,
            EventSectionType eventSectionType
    ) {
        return StudentGradableEventResponseDto.builder()
                .id(projection.getId())
                .type(eventSectionType)
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

    public InstructorGradableEventResponseDto toInstructorGradableEventResponseDto(
            InstructorGradableEventProjection projection,
            EventSectionType eventSectionType
    ) {
        return InstructorGradableEventResponseDto.builder()
                .id(projection.getId())
                .type(eventSectionType)
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
