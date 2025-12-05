package com.agh.polymorphia_backend.service.course.strategy;

import com.agh.polymorphia_backend.dto.request.course_import.gradable_event.GradableEventDetailsRequestDto;
import com.agh.polymorphia_backend.dto.request.course_import.gradable_event.ProjectDetailsRequestDto;
import com.agh.polymorphia_backend.model.gradable_event.Assignment;
import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import com.agh.polymorphia_backend.model.gradable_event.Project;
import com.agh.polymorphia_backend.model.gradable_event.Test;
import com.agh.polymorphia_backend.repository.event_section.EventSectionRepository;
import com.agh.polymorphia_backend.repository.gradable_event.GradableEventRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.function.Function;

@Component
@AllArgsConstructor
public class GradableEventUpdateStrategy implements EntityUpdateStrategy<GradableEventDetailsRequestDto, GradableEvent> {

    private final GradableEventRepository gradableEventRepository;
    private final EventSectionRepository eventSectionRepository;

    @Override
    public Function<GradableEventDetailsRequestDto, String> getKeyExtractor() {
        return GradableEventDetailsRequestDto::getKey;
    }

    @Override
    public Function<GradableEvent, String> getEntityKeyExtractor() {
        return GradableEvent::getKey;
    }

    @Override
    public Function<GradableEventDetailsRequestDto, ?> getTypeExtractor() {
        return GradableEventDetailsRequestDto::getType;
    }

    @Override
    public JpaRepository<GradableEvent, Long> getRepository() {
        return gradableEventRepository;
    }

    @Override
    public List<GradableEvent> findAllByKeys(List<String> keys, Long courseId) {
        return gradableEventRepository.findAllByKeyIn(keys, courseId);
    }

    @Override
    public GradableEvent createNewEntity(GradableEventDetailsRequestDto dto) {
        return switch (dto.getType()) {
            case ASSIGNMENT:
                yield Assignment.builder().build();
            case TEST:
                yield Test.builder().build();
            case PROJECT:
                yield Project.builder()
                        .allowCrossCourseGroupProjectGroups(
                                ((ProjectDetailsRequestDto) dto).getAllowCrossCourseGroupProjectGroup()
                        )
                        .build();
        };
    }

    @Override
    public GradableEvent updateEntity(GradableEvent entity, GradableEventDetailsRequestDto dto, Map<GradableEventDetailsRequestDto, Long> orderIds, Long eventSectionId) {
        entity.setKey(dto.getKey());
        entity.setName(dto.getName());
        entity.setTopic(dto.getTopic());
        entity.setIsHidden(dto.getIsHidden());
        entity.setIsLocked(dto.getIsLocked());
        entity.setMarkdownSourceUrl(dto.getMarkdownSourceUrl());
        entity.setOrderIndex(orderIds.get(dto));
//        entity.setRoadMapOrderIndex();
        entity.setEventSection(eventSectionRepository.getReferenceById(eventSectionId));

        return entity;
    }


}
