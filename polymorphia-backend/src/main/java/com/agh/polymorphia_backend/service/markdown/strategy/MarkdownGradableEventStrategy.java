package com.agh.polymorphia_backend.service.markdown.strategy;

import com.agh.polymorphia_backend.config.FetchClient;
import com.agh.polymorphia_backend.dto.response.markdown.MarkdownResponseDto;
import com.agh.polymorphia_backend.dto.response.markdown.SourceUrlMarkdownResponseDto;
import com.agh.polymorphia_backend.model.event_section.EventSectionType;
import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import com.agh.polymorphia_backend.repository.gradable_event.GradableEventRepository;
import com.agh.polymorphia_backend.service.gradable_event.GradableEventService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@AllArgsConstructor
public class MarkdownGradableEventStrategy implements MarkdownStrategy {
    private final GradableEventService gradableEventService;
    private final GradableEventRepository gradableEventRepository;
    private final FetchClient fetchClient;

    @Override
    public MarkdownResponseDto getMarkdown(Long resourceId) {
        GradableEvent gradableEvent = gradableEventService.getGradableEventById(resourceId);

        if (gradableEvent.getMarkdown() == null || gradableEvent.getMarkdown().isEmpty()) {
            return MarkdownResponseDto.builder()
                    .markdown("")
                    .build();
        }

        return MarkdownResponseDto.builder()
                .markdown(gradableEvent.getMarkdown())
                .build();
    }

    @Override
    public SourceUrlMarkdownResponseDto getMarkdownSourceUrl(Long resourceId) {
        GradableEvent gradableEvent = gradableEventService.getGradableEventById(resourceId);

        return SourceUrlMarkdownResponseDto.builder()
                .sourceUrl(gradableEvent.getMarkdownSourceUrl())
                .build();
    }

    @Override
    public void setMarkdown(Long resourceId, String markdown) {
        GradableEvent gradableEvent = gradableEventService.getGradableEventById(resourceId);

        try {
            gradableEvent.setMarkdown(markdown);
            gradableEventRepository.save(gradableEvent);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Nie udało się zaktualizować treści markdown.");
        }
    }

    @Override
    public void resetMarkdown(Long resourceId) {
        GradableEvent gradableEvent = gradableEventService.getGradableEventById(resourceId);
        String sourceUrl = gradableEvent.getMarkdownSourceUrl();

        if (sourceUrl == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Adres URL pliku markdown nie jest zdefiniowany.");
        }

        if (gradableEvent.getEventSection().getEventSectionType() == EventSectionType.TEST) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Format markdown nie jest obsługiwany dla sekcji testowych wydarzeń");
        }

        try {
            String markdown = fetchClient.fetchStringFromUrl(sourceUrl).block();
            gradableEvent.setMarkdown(markdown);
            gradableEventRepository.save(gradableEvent);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Nie udało się zresetować treści.");
        }
    }
}
