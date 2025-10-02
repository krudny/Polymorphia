package com.agh.polymorphia_backend.service.mapper;


import com.agh.polymorphia_backend.dto.response.event.EventSectionResponseDto;
import com.agh.polymorphia_backend.model.event_section.EventSection;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EventSectionMapper {

    public EventSectionResponseDto toEventSectionResponseDto(EventSection eventSection) {
        return EventSectionResponseDto.builder()
                .id(eventSection.getId())
                .type(eventSection.getEventSectionType())
                .name(eventSection.getName())
                .orderIndex(eventSection.getOrderIndex())
                .build();
    }
}
