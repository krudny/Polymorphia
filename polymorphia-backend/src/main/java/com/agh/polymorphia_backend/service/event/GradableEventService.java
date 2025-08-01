package com.agh.polymorphia_backend.service.event;

import com.agh.polymorphia_backend.dto.response.event.gradable.MarkdownResponseDto;
import com.agh.polymorphia_backend.dto.response.event.section.GradableEventResponseDto;
import com.agh.polymorphia_backend.exception.database.InvalidArgumentException;
import com.agh.polymorphia_backend.exception.database.UnknownSubclassException;
import com.agh.polymorphia_backend.model.event.gradable.GradableEvent;
import com.agh.polymorphia_backend.repository.event.GradableEventRepository;
import com.agh.polymorphia_backend.service.DbExtractingUtil;
import com.agh.polymorphia_backend.service.grade.GradeService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@AllArgsConstructor
public class GradableEventService {
    private static final String EVENT_SECTION_NOT_FOUND = "GradableEvent not found";

    private final GradableEventRepository gradableEventRepository;
    private final GradeService gradeService;

    public Page<GradableEventResponseDto> getGradableEventDtos(Long eventSectionId, Pageable pageable) {
        return getGradableEventsPageable(eventSectionId, pageable)
                .map(this::gradableEventToResponseDto);
    }


    public Set<GradableEvent> getGradableEvents(Long eventSectionId) {
        try {
            return gradableEventRepository.findAllByEventSectionId(eventSectionId);
        } catch (NullPointerException ex) {
            throw new UnknownSubclassException(
                    String.format(DbExtractingUtil.UNKNOWN_SUBCLASS,
                            DbExtractingUtil.FIELD_GRADABLE_EVENT)
            );
        }
    }

    public MarkdownResponseDto getMarkdown(Long gradableEventId) {
        return MarkdownResponseDto.builder()
                .markdown(getGradableEvent(gradableEventId).getMarkdown())
                .build();
    }

    public void saveMarkdown(Long gradableEventId, MarkdownResponseDto markdown) {
        GradableEvent gradableEvent = getGradableEvent(gradableEventId);
        gradableEvent.setMarkdown(markdown.getMarkdown());
        gradableEventRepository.save(gradableEvent);
    }

    private GradableEvent getGradableEvent(Long gradableEventId) {
        try {
            return gradableEventRepository.findById(gradableEventId)
                    .orElseThrow(() -> new InvalidArgumentException(EVENT_SECTION_NOT_FOUND));
        } catch (NullPointerException ex) {
            throw new UnknownSubclassException(
                    String.format(DbExtractingUtil.UNKNOWN_SUBCLASS,
                            DbExtractingUtil.FIELD_GRADABLE_EVENT)
            );
        }
    }

    private Page<GradableEvent> getGradableEventsPageable(Long eventSectionId, Pageable pageable) {
        try {
            return gradableEventRepository.findAllByEventSectionIdPageable(eventSectionId, pageable);
        } catch (NullPointerException ex) {
            throw new UnknownSubclassException(
                    String.format(DbExtractingUtil.UNKNOWN_SUBCLASS,
                            DbExtractingUtil.FIELD_GRADABLE_EVENT)
            );
        }
    }

    private GradableEventResponseDto gradableEventToResponseDto(GradableEvent gradableEvent) {
        return GradableEventResponseDto.builder()
                .id(gradableEvent.getId())
                .topic(gradableEvent.getTopic())
                .name(gradableEvent.getName())
                .orderIndex(gradableEvent.getOrderIndex())
                .type(gradableEvent.getEventSection().getEventSectionType())
                .gainedXp(gradeService.getGradableEventXp(gradableEvent))
                .build();
    }


}
