package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.response.knowledge_base.KnowledgeBaseResponseDto;
import com.agh.polymorphia_backend.dto.response.knowledge_base.KnowledgeBaseType;
import com.agh.polymorphia_backend.model.user.student.EvolutionStage;
import com.agh.polymorphia_backend.model.reward.*;
import com.agh.polymorphia_backend.model.reward.item.ItemType;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class KnowledgeBaseMapper {
    public static final String FLAT_BONUS_ITEM_SUBTITLE = "+%.1f xp do eventów z kategorii %s";
    public static final String FLAT_BONUS_ITEM_SHORT_SUBTITLE = "+%.1f xp %s";
    public static final String PERCENTAGE_BONUS_ITEM_SUBTITLE = "+%d%% do eventów z kategorii %s";
    public static final String PERCENTAGE_BONUS_ITEM_SHORT_SUBTITLE = "+%d%% %s";
    private static final String EVOLUTION_STAGES_GRADING_SUBTITLE = "%.1f xp odblokowuje ocenę %.1f";
    private RewardMapper rewardMapper;

    private static KnowledgeBaseResponseDto.KnowledgeBaseResponseDtoBuilder getDtoBuilderForReward(Reward reward) {
        return KnowledgeBaseResponseDto.builder()
                .id(reward.getId())
                .orderIndex(reward.getOrderIndex())
                .name(reward.getName())
                .description(reward.getDescription())
                .imageUrl(reward.getImageUrl());
    }

    private static String getItemSubtitle(Item item) {
        return switch (item.getItemType()) {
            case ItemType.FLAT_BONUS -> String.format(
                    FLAT_BONUS_ITEM_SUBTITLE,
                    ((FlatBonusItem) item).getXpBonus(),
                    item.getEventSection().getName()
            );
            case ItemType.PERCENTAGE_BONUS -> String.format(
                    PERCENTAGE_BONUS_ITEM_SUBTITLE,
                    ((PercentageBonusItem) item).getPercentageBonus(),
                    item.getEventSection().getName()
            );
        };
    }

    public KnowledgeBaseResponseDto evolutionStageToResponseDto(EvolutionStage evolutionStage) {
        return KnowledgeBaseResponseDto.builder()
                .type(KnowledgeBaseType.EVOLUTION_STAGE)
                .id(evolutionStage.getId())
                .orderIndex(evolutionStage.getOrderIndex())
                .name(evolutionStage.getName())
                .subtitle(String.format(EVOLUTION_STAGES_GRADING_SUBTITLE, evolutionStage.getMinXp(), evolutionStage.getGrade()))
                .description(evolutionStage.getDescription())
                .imageUrl(evolutionStage.getImageUrl())
                .build();
    }

    public KnowledgeBaseResponseDto chestToResponseDto(Chest chest) {
        return getDtoBuilderForReward(chest)
                .type(KnowledgeBaseType.CHEST)
                .subtitle(chest.getBehavior().getTextValue())
                .relatedRewards(rewardMapper.relatedRewardsToResponseDto(chest.getItems()))
                .build();
    }

    public KnowledgeBaseResponseDto itemToResponseDto(Item item) {
        String subtitle = getItemSubtitle(item);

        return getDtoBuilderForReward(item)
                .type(KnowledgeBaseType.ITEM)
                .subtitle(subtitle)
                .relatedRewards(rewardMapper.relatedRewardsToResponseDto(item.getChests()))
                .build();
    }
}
