package com.agh.polymorphia_backend.service.markdown.strategy;

import com.agh.polymorphia_backend.dto.response.markdown.MarkdownResponseDTO;
import com.agh.polymorphia_backend.dto.response.markdown.SourceUrlMarkdownResponseDTO;
import lombok.Setter;
import org.springframework.stereotype.Service;

@Service
@Setter
public class MarkdownStrategyContext implements MarkdownStrategy {
    private MarkdownStrategy markdownStrategy;

    @Override
    public MarkdownResponseDTO getMarkdown(Long resourceId) {
        return markdownStrategy.getMarkdown(resourceId);
    }

    @Override
    public SourceUrlMarkdownResponseDTO getMarkdownSourceUrl(Long resourceId) {
        return markdownStrategy.getMarkdownSourceUrl(resourceId);
    }

    @Override
    public void setMarkdown(Long resourceId, String markdown) {
        markdownStrategy.setMarkdown(resourceId, markdown);
    }

    @Override
    public void resetMarkdown(Long resourceId) {
        markdownStrategy.resetMarkdown(resourceId);
    }
}
