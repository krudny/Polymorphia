package com.agh.polymorphia_backend.dto.response.course.knowledge.base;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.List;

@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class KnowledgeBaseSlideResponseDto {
    @NotNull
    private KnowledgeBaseSlideType type;

    @NotNull
    private Long id;

    @NotNull
    private Long orderIndex;

    @NotNull
    private String name;

    @NotNull
    private String subtitle;

    @NotNull
    private String description;

    @NotNull
    private String imageUrl;

    private List<KnowledgeBaseSlideRelatedRewardResponseDto> relatedRewards;
}
