package com.agh.polymorphia_backend.dto.response.course.knowledge.base;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public class KnowledgeBaseSlideRelatedRewardResponseDto {
    @NotNull
    private Long id;

    @NotNull
    private Long orderIndex;

    @NotNull
    private String name;

    @NotNull
    private String imageUrl;
}
