package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.response.knowledge_base.KnowledgeBaseResponseDto;
import com.agh.polymorphia_backend.dto.response.knowledge_base.KnowledgeBaseType;
import com.agh.polymorphia_backend.dto.response.reward.BaseRewardResponseDto;
import com.agh.polymorphia_backend.model.course.EvolutionStage;
import com.agh.polymorphia_backend.model.course.reward.Reward;
import com.agh.polymorphia_backend.model.course.reward.chest.Chest;
import com.agh.polymorphia_backend.model.course.reward.item.FlatBonusItem;
import com.agh.polymorphia_backend.model.course.reward.item.Item;
import com.agh.polymorphia_backend.model.course.reward.item.ItemType;
import com.agh.polymorphia_backend.model.course.reward.item.PercentageBonusItem;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@AllArgsConstructor
public class KnowledgeBaseMapper {
    private static final String EVOLUTION_STAGES_GRADING_SUBTITLE = "%.1f xp odblokowuje ocenę %.1f";
    private static final String FLAT_BONUS_ITEM_SUBTITLE = "+%.1f xp do eventów z kategorii %s";
    private static final String PERCENTAGE_BONUS_ITEM_SUBTITLE = "+%d%% do eventów z kategorii %s";
    private static final String EVOLUTION_STAGE_GRADING_INFO = "%.1f (%.1f xp)";
    private RewardMapper rewardMapper;

    private static KnowledgeBaseResponseDto.KnowledgeBaseResponseDtoBuilder getDtoBuilderForReward(Reward reward) {
        return KnowledgeBaseResponseDto.builder()
                .id(reward.getId())
                .orderIndex(reward.getOrderIndex())
                .name(reward.getName())
                .description(reward.getDescription())
                .imageUrl(reward.getImageUrl());
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
                .additionalGradingInfo(String.format(EVOLUTION_STAGE_GRADING_INFO, evolutionStage.getGrade(), evolutionStage.getMinXp()))
                .build();
    }

    public KnowledgeBaseResponseDto chestToResponseDto(Chest chest) {
        return getDtoBuilderForReward(chest)
                .type(KnowledgeBaseType.CHEST)
                .subtitle(chest.getBehavior().getTextValue())
                .relatedRewards(relatedRewardsToResponseDto(chest.getItems()))
                .build();
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

    private <T extends Reward> List<BaseRewardResponseDto> relatedRewardsToResponseDto(List<T> rewards) {
        return rewards.stream()
                .map(rewardMapper::rewardToRewardResponseDto)
                .sorted(Comparator.comparing(BaseRewardResponseDto::getOrderIndex))
                .toList();
    }

    public KnowledgeBaseResponseDto itemToResponseDto(Item item) {
        String subtitle = getItemSubtitle(item);

        return getDtoBuilderForReward(item)
                .type(KnowledgeBaseType.ITEM)
                .subtitle(subtitle)
                .relatedRewards(relatedRewardsToResponseDto(item.getChests()))
                .build();
    }
}
