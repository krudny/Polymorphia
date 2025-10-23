package com.agh.polymorphia_backend.service.markdown.strategy;

import com.agh.polymorphia_backend.dto.response.markdown.MarkdownResponseDto;
import com.agh.polymorphia_backend.dto.response.markdown.SourceUrlMarkdownResponseDto;

public interface MarkdownStrategy {
    MarkdownResponseDto getMarkdown(Long resourceId);

    SourceUrlMarkdownResponseDto getMarkdownSourceUrl(Long resourceId);

    void setMarkdown(Long resourceId, String markdown);

    void resetMarkdown(Long resourceId);
}
