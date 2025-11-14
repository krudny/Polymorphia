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
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.function.Function;

@Service
@AllArgsConstructor
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
                .name(projection.getName())
                .orderIndex(projection.getOrderIndex())
                .roadMapOrderIndex(projection.getRoadMapOrderIndex())
                .isHidden(projection.getIsHidden())
                .gainedXp(formatXp(projection.getGainedXp()))
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
                .orderIndex(projection.getOrderIndex())
                .roadMapOrderIndex(projection.getRoadMapOrderIndex())
                .isHidden(projection.getIsHidden())
                .ungradedStudents(projection.getUngradedStudents())
                .isLocked(projection.getIsLocked())
                .hasPossibleReward(projection.getHasPossibleReward())
                .build();
    }

    private String formatXp(Long xp) {
        return xp != null ? xp.toString() : "-";
    }


}
