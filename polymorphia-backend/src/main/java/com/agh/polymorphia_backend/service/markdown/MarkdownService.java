package com.agh.polymorphia_backend.service.markdown;

import com.agh.polymorphia_backend.config.FetchClient;
import com.agh.polymorphia_backend.dto.request.markdown.MarkdownRequestDTO;
import com.agh.polymorphia_backend.dto.response.markdown.MarkdownResponseDTO;
import com.agh.polymorphia_backend.model.event_section.EventSectionType;
import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import com.agh.polymorphia_backend.repository.course.GradableEventRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@AllArgsConstructor
public class MarkdownService {
    private final FetchClient fetchClient;
    private final GradableEventRepository gradableEventRepository;

    public MarkdownResponseDTO getMarkdown(Long gradableEventId) {
        GradableEvent gradableEvent = gradableEventRepository
                .findById(gradableEventId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid gradable event id"));

        return MarkdownResponseDTO.builder()
                .markdown(gradableEvent.getMarkdown())
                .build();
    }

    public void setMarkdown(MarkdownRequestDTO request) {
        GradableEvent gradableEvent = gradableEventRepository
                .findById(request.getGradableEventId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid gradable event id"));

        try {
            gradableEvent.setMarkdown(request.getMarkdown());
            gradableEventRepository.save(gradableEvent);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Markdown update failed");
        }
    }

    public void updateMarkdown(Long gradableEventId) {
        GradableEvent gradableEvent = gradableEventRepository
                .findById(gradableEventId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid gradable event id"));

        String sourceUrl = gradableEvent.getMarkdownSourceUrl();

        if (sourceUrl == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Markdown url is undefined");
        }

        if (gradableEvent.getEventSection().getEventSectionType() == EventSectionType.TEST) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Markdown for test event sections is not supported");
        }

        try {
            String markdown = fetchClient.fetchStringFromUrl(gradableEvent.getMarkdownSourceUrl()).block();
            gradableEvent.setMarkdown(markdown);
            gradableEventRepository.save(gradableEvent);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Markdown update failed");
        }
    }
}
