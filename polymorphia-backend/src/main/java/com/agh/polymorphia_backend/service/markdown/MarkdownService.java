package com.agh.polymorphia_backend.service.markdown;

import com.agh.polymorphia_backend.config.FetchClient;
import com.agh.polymorphia_backend.dto.response.markdown.MarkdownResponseDTO;
import com.agh.polymorphia_backend.dto.response.markdown.SourceUrlMarkdownResponseDTO;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.event_section.EventSectionType;
import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import com.agh.polymorphia_backend.repository.course.CourseRepository;
import com.agh.polymorphia_backend.repository.course.GradableEventRepository;
import com.agh.polymorphia_backend.service.course.CourseService;
import com.agh.polymorphia_backend.service.gradable_event.GradableEventService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@AllArgsConstructor
public class MarkdownService {
    private final FetchClient fetchClient;
    private final CourseService courseService;
    private final GradableEventService gradableEventService;
    private final GradableEventRepository gradableEventRepository;
    private final CourseRepository courseRepository;

    public MarkdownResponseDTO getMarkdown(MarkdownType type, Long resourceId) {
        return switch (type) {
            case GRADABLE_EVENT -> getGradableEventMarkdown(resourceId);
            case COURSE_RULES -> getCourseRulesMarkdown(resourceId);
        };
    }

    public SourceUrlMarkdownResponseDTO getMarkdownSourceUrl(MarkdownType type, Long resourceId) {
        return switch (type) {
            case GRADABLE_EVENT -> getGradableEventMarkdownSourceUrl(resourceId);
            case COURSE_RULES -> getCourseRulesMarkdownSourceUrl(resourceId);
        };
    }

    public void setMarkdown(MarkdownType type, Long resourceId, String markdown) {
        switch (type) {
            case GRADABLE_EVENT -> setGradableEventMarkdown(resourceId, markdown);
            case COURSE_RULES -> setCourseRulesMarkdown(resourceId, markdown);
        }
    }

    public void resetMarkdown(MarkdownType type, Long resourceId) {
        switch (type) {
            case GRADABLE_EVENT -> resetGradableEventMarkdown(resourceId);
            case COURSE_RULES -> resetCourseRulesMarkdown(resourceId);
        }
    }

    private MarkdownResponseDTO getGradableEventMarkdown(Long gradableEventId) {
        GradableEvent gradableEvent = gradableEventService.getGradableEventById(gradableEventId);

        if (gradableEvent.getMarkdown() == null || gradableEvent.getMarkdown().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Markdown is empty");
        }

        return MarkdownResponseDTO.builder()
                .markdown(gradableEvent.getMarkdown())
                .build();
    }

    private MarkdownResponseDTO getCourseRulesMarkdown(Long courseId) {
        Course course = courseService.getCourseById(courseId);

        if (course.getMarkdown() == null || course.getMarkdown().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Markdown is empty");
        }

        return MarkdownResponseDTO.builder()
                .markdown(course.getMarkdown())
                .build();
    }

    private SourceUrlMarkdownResponseDTO getGradableEventMarkdownSourceUrl(Long gradableEventId) {
        GradableEvent gradableEvent = gradableEventService.getGradableEventById(gradableEventId);

        return SourceUrlMarkdownResponseDTO.builder()
                .sourceUrl(gradableEvent.getMarkdownSourceUrl())
                .build();
    }

    private SourceUrlMarkdownResponseDTO getCourseRulesMarkdownSourceUrl(Long courseId) {
        Course course = courseService.getCourseById(courseId);

        return SourceUrlMarkdownResponseDTO.builder()
                .sourceUrl(course.getMarkdownSourceUrl())
                .build();
    }

    private void setGradableEventMarkdown(Long gradableEventId, String markdown) {
        GradableEvent gradableEvent = gradableEventService.getGradableEventById(gradableEventId);

        try {
            gradableEvent.setMarkdown(markdown);
            gradableEventRepository.save(gradableEvent);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Markdown update failed");
        }
    }

    private void setCourseRulesMarkdown(Long courseId, String markdown) {
        Course course = courseService.getCourseById(courseId);

        try {
            course.setMarkdown(markdown);
            courseRepository.save(course);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Course rules markdown update failed");
        }
    }

    private void resetGradableEventMarkdown(Long gradableEventId) {
        GradableEvent gradableEvent = gradableEventService.getGradableEventById(gradableEventId);
        String sourceUrl = gradableEvent.getMarkdownSourceUrl();

        if (sourceUrl == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Markdown url is undefined");
        }

        if (gradableEvent.getEventSection().getEventSectionType() == EventSectionType.TEST) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Markdown for test event sections is not supported");
        }

        try {
            String markdown = fetchClient.fetchStringFromUrl(sourceUrl).block();
            gradableEvent.setMarkdown(markdown);
            gradableEventRepository.save(gradableEvent);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Markdown reset failed");
        }
    }

    private void resetCourseRulesMarkdown(Long courseId) {
        Course course = courseService.getCourseById(courseId);
        String sourceUrl = course.getMarkdownSourceUrl();

        if (sourceUrl == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Course rules markdown source url is undefined");
        }

        try {
            String markdown = fetchClient.fetchStringFromUrl(sourceUrl).block();
            course.setMarkdown(markdown);
            courseRepository.save(course);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Course rules markdown reset failed");
        }
    }
}
