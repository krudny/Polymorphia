package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.response.event.BaseGradableEventResponseDto;
import com.agh.polymorphia_backend.dto.response.event.InstructorGradableEventResponseDto;
import com.agh.polymorphia_backend.dto.response.event.StudentGradableEventResponseDto;
import com.agh.polymorphia_backend.model.event_section.EventSectionType;
import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import com.agh.polymorphia_backend.util.NumberFormatter;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
@AllArgsConstructor
public class GradableEventMapper {

    public BaseGradableEventResponseDto toStudentGradableEventResponseDto(GradableEvent gradableEvent, EventSectionType eventType, Optional<BigDecimal> gainedXp, boolean hasReward) {
        String gainedXpString = gainedXp.map(NumberFormatter::formatToString).orElse(null);
        BaseGradableEventResponseDto.BaseGradableEventResponseDtoBuilder<?, ?> responseBuilder =
                StudentGradableEventResponseDto.builder()
                        .isLocked(gradableEvent.getIsLocked())
                        .hasReward(hasReward)
                        .gainedXp(gainedXpString);

        return toBaseGradableEventResponseDto(responseBuilder, gradableEvent, eventType);

    }

    public BaseGradableEventResponseDto toInstructorGradableEventResponseDto(
            GradableEvent gradableEvent,
            EventSectionType eventType,
            Long ungradedStudents
    ) {
        BaseGradableEventResponseDto.BaseGradableEventResponseDtoBuilder<?, ?> responseBuilder = InstructorGradableEventResponseDto.builder()
                .ungradedStudents(ungradedStudents);

        return toBaseGradableEventResponseDto(responseBuilder, gradableEvent, eventType);
    }

    private <T extends BaseGradableEventResponseDto.BaseGradableEventResponseDtoBuilder<?, ?>> BaseGradableEventResponseDto
    toBaseGradableEventResponseDto(
            T builder,
            GradableEvent gradableEvent,
            EventSectionType eventType
    ) {
        return builder
                .id(gradableEvent.getId())
                .name(gradableEvent.getName())
                .topic(gradableEvent.getTopic())
                .orderIndex(gradableEvent.getOrderIndex())
                .type(eventType)
                .build();
    }


}
