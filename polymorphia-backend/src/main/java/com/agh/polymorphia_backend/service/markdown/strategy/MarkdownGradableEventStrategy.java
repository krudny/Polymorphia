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

    private static final String MARKDOWN_UPDATE_FAILED = "Markdown update failed";
    private static final String MARKDOWN_URL_UNDEFINED = "Markdown URL is undefined";
    private static final String MARKDOWN_TEST_SECTIONS_NOT_SUPPORTED = "Markdown for test event sections is not supported";
    private static final String MARKDOWN_RESET_FAILED = "Markdown reset failed";

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
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, MARKDOWN_UPDATE_FAILED);
        }
    }

    @Override
    public void resetMarkdown(Long resourceId) {
        GradableEvent gradableEvent = gradableEventService.getGradableEventById(resourceId);
        String sourceUrl = gradableEvent.getMarkdownSourceUrl();

        if (sourceUrl == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, MARKDOWN_URL_UNDEFINED);
        }

        if (gradableEvent.getEventSection().getEventSectionType() == EventSectionType.TEST) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, MARKDOWN_TEST_SECTIONS_NOT_SUPPORTED);
        }

        try {
            String markdown = fetchClient.fetchStringFromUrl(sourceUrl).block();
            gradableEvent.setMarkdown(markdown);
            gradableEventRepository.save(gradableEvent);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, MARKDOWN_RESET_FAILED);
        }
    }
}
