package com.agh.polymorphia_backend.service.markdown;

import com.agh.polymorphia_backend.dto.response.markdown.MarkdownResponseDTO;
import com.agh.polymorphia_backend.dto.response.markdown.SourceUrlMarkdownResponseDTO;
import com.agh.polymorphia_backend.service.markdown.strategy.MarkdownCourseStrategy;
import com.agh.polymorphia_backend.service.markdown.strategy.MarkdownGradableEventStrategy;
import com.agh.polymorphia_backend.service.markdown.strategy.MarkdownStrategy;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MarkdownService {
    private final MarkdownCourseStrategy markdownCourseStrategy;
    private final MarkdownGradableEventStrategy markdownGradableEventStrategy;

    public MarkdownResponseDTO getMarkdown(MarkdownType type, Long resourceId) {
        return getStrategyForType(type).getMarkdown(resourceId);
    }

    public SourceUrlMarkdownResponseDTO getMarkdownSourceUrl(MarkdownType type, Long resourceId) {
        return getStrategyForType(type).getMarkdownSourceUrl(resourceId);
    }

    public void setMarkdown(MarkdownType type, Long resourceId, String markdown) {
        getStrategyForType(type).setMarkdown(resourceId, markdown);
    }

    public void resetMarkdown(MarkdownType type, Long resourceId) {
        getStrategyForType(type).resetMarkdown(resourceId);
    }

    private MarkdownStrategy getStrategyForType(MarkdownType type) {
        return switch (type) {
            case GRADABLE_EVENT -> markdownGradableEventStrategy;
            case COURSE_RULES -> markdownCourseStrategy;
        };
    }
}
