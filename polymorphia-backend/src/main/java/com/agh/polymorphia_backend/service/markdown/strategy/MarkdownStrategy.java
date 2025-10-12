package com.agh.polymorphia_backend.service.markdown.strategy;

import com.agh.polymorphia_backend.dto.response.markdown.MarkdownResponseDTO;
import com.agh.polymorphia_backend.dto.response.markdown.SourceUrlMarkdownResponseDTO;

public interface MarkdownStrategy {
    MarkdownResponseDTO getMarkdown(Long resourceId);

    SourceUrlMarkdownResponseDTO getMarkdownSourceUrl(Long resourceId);

    void setMarkdown(Long resourceId, String markdown);

    void resetMarkdown(Long resourceId);
}
