package com.agh.polymorphia_backend.service.markdown;

import com.agh.polymorphia_backend.config.FetchClient;
import com.agh.polymorphia_backend.dto.request.markdown.MarkdownRequestDTO;
import com.agh.polymorphia_backend.dto.response.markdown.MarkdownResponseDTO;
import com.agh.polymorphia_backend.dto.response.markdown.SourceUrlMarkdownResponseDTO;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.event_section.EventSectionType;
import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import com.agh.polymorphia_backend.repository.course.GradableEventRepository;
import com.agh.polymorphia_backend.service.course.CourseService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@AllArgsConstructor
public class MarkdownService {
    private final FetchClient fetchClient;
    private final CourseService courseService;
    private final GradableEventRepository gradableEventRepository;

    public MarkdownResponseDTO getMarkdown(MarkdownType type, Long resourceId) {
        switch (type) {
            case GRADABLE_EVENT:
                return getGradableEventMarkdown(resourceId);
            case COURSE_RULES:
                return getCourseRulesMarkdown(resourceId);
            default:
                throw new IllegalArgumentException("Unsupported markdown type: " + type);
        }
    }

    private MarkdownResponseDTO getGradableEventMarkdown(Long gradableEventId) {
        GradableEvent gradableEvent = findGradableEvent(gradableEventId);

        if (gradableEvent.getMarkdown() == null || gradableEvent.getMarkdown().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Markdown is empty");
        }

        return MarkdownResponseDTO.builder()
                .markdown(gradableEvent.getMarkdown())
                .build();
    }

    private MarkdownResponseDTO getCourseRulesMarkdown(Long courseId) {
        Course course = courseService.getCourseById(courseId);
        String markdown = fetchClient.fetchStringFromUrl(course.getInfoUrl()).block();

        return MarkdownResponseDTO.builder().markdown(markdown).build();
    }

    public SourceUrlMarkdownResponseDTO getSourceUrl(Long gradableEventId) {
        GradableEvent gradableEvent = findGradableEvent(gradableEventId);

        return SourceUrlMarkdownResponseDTO.builder()
                .sourceUrl(gradableEvent.getMarkdownSourceUrl())
                .build();
    }

    public void setMarkdown(MarkdownRequestDTO request) {
        GradableEvent gradableEvent = findGradableEvent(request.getGradableEventId());

        try {
            gradableEvent.setMarkdown(request.getMarkdown());
            gradableEventRepository.save(gradableEvent);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Markdown update failed");
        }
    }

    public void resetMarkdown(Long gradableEventId) {
        GradableEvent gradableEvent = findGradableEvent(gradableEventId);
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
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Markdown reset failed");
        }
    }

    private GradableEvent findGradableEvent(Long gradableEventId) {
        return gradableEventRepository
                .findById(gradableEventId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid gradable event id"));
    }
}
