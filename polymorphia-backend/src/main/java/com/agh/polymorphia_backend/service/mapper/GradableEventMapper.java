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
import java.util.function.Function;

@Service
@AllArgsConstructor
public class GradableEventMapper {
    private static final String mockedTitle = "*********";
    private static final String mockedTopic = "[Wydarzenie ukryte]";

    public BaseGradableEventResponseDto toStudentGradableEventResponseDto(
            GradableEvent gradableEvent,
            EventSectionType eventType,
            Optional<BigDecimal> gainedXp,
            boolean hasReward,
            Function<GradableEvent, Long> orderIndexExtractor
    ) {
        String gainedXpString = gainedXp.map(NumberFormatter::formatToString).orElse(null);
        BaseGradableEventResponseDto.BaseGradableEventResponseDtoBuilder<?, ?> responseBuilder =
                StudentGradableEventResponseDto.builder()
                        .isLocked(gradableEvent.getIsLocked())
                        .hasReward(hasReward)
                        .name(gradableEvent.getIsLocked() ? mockedTitle : gradableEvent.getName())
                        .topic(gradableEvent.getIsLocked() ? mockedTopic : gradableEvent.getTopic())
                        .gainedXp(gainedXpString);

        return toBaseGradableEventResponseDto(responseBuilder, gradableEvent, eventType, orderIndexExtractor);

    }

    public BaseGradableEventResponseDto toInstructorGradableEventResponseDto(
            GradableEvent gradableEvent,
            EventSectionType eventType,
            Long ungradedStudents,
            Function<GradableEvent, Long> orderIndexExtractor
    ) {
        BaseGradableEventResponseDto.BaseGradableEventResponseDtoBuilder<?, ?> responseBuilder = InstructorGradableEventResponseDto.builder()
                .ungradedStudents(ungradedStudents)
                .name(gradableEvent.getName())
                .topic(gradableEvent.getTopic());

        return toBaseGradableEventResponseDto(responseBuilder, gradableEvent, eventType, orderIndexExtractor);
    }

    private <T extends BaseGradableEventResponseDto.BaseGradableEventResponseDtoBuilder<?, ?>> BaseGradableEventResponseDto
    toBaseGradableEventResponseDto(
            T builder,
            GradableEvent gradableEvent,
            EventSectionType eventType,
            Function<GradableEvent, Long> orderIndexExtractor
    ) {
        return builder
                .id(gradableEvent.getId())
                .orderIndex(orderIndexExtractor.apply(gradableEvent))
                .type(eventType)
                .build();
    }


}
