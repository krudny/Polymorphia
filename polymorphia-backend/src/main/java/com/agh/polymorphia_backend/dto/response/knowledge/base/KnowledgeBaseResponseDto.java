package com.agh.polymorphia_backend.dto.response.knowledge.base;

import com.agh.polymorphia_backend.dto.response.reward.RewardResponseDto;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class KnowledgeBaseResponseDto {
    @NotNull
    private Long id;

    @NotNull
    private KnowledgeBaseType type;

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

    private List<RewardResponseDto> relatedRewards;
}
