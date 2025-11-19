package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.response.equipment.EquipmentChestResponseDto;
import com.agh.polymorphia_backend.dto.response.equipment.EquipmentItemResponseDto;
import com.agh.polymorphia_backend.dto.response.reward.BaseRewardResponseDto;
import com.agh.polymorphia_backend.dto.response.reward.BaseRewardResponseDtoWithType;
import com.agh.polymorphia_backend.dto.response.reward.assignment_details.ChestAssignmentDetailsResponseDto;
import com.agh.polymorphia_backend.dto.response.reward.chest.ChestResponseDtoBase;
import com.agh.polymorphia_backend.dto.response.reward.item.FlatBonusItemResponseDtoBase;
import com.agh.polymorphia_backend.dto.response.reward.item.ItemResponseDtoBase;
import com.agh.polymorphia_backend.dto.response.reward.item.PercentageBonusItemResponseDtoBase;
import com.agh.polymorphia_backend.model.course.reward.*;
import com.agh.polymorphia_backend.service.course.reward.AssignedRewardService;
import lombok.AllArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
@AllArgsConstructor
public class RewardMapper {
    private final AssignedRewardService assignedRewardService;

    public BaseRewardResponseDtoWithType rewardToRewardResponseDtoWithType(Reward reward) {
        return BaseRewardResponseDtoWithType.builder()
                .rewardType(reward.getRewardType())
                .reward(rewardToRewardResponseDto(reward))
                .build();
    }

    public BaseRewardResponseDto rewardToRewardResponseDto(Reward reward) {
        return baseRewardToBaseRewardResponseDto(BaseRewardResponseDto.builder(), reward);
    }

    public BaseRewardResponseDto rewardToRewardResponseDto(Reward reward, Long animalId) {
        return switch (reward.getRewardType()) {
            case ITEM -> itemToRewardResponseDto((Item) Hibernate.unproxy(reward), animalId);
            case CHEST -> chestToRewardResponseDto((Chest) Hibernate.unproxy(reward), animalId);
        };
    }

    public BaseRewardResponseDto chestToRewardResponseDto(Chest chest, Long animalId) {
        ChestResponseDtoBase.ChestResponseDtoBaseBuilder builder =
                ChestResponseDtoBase.builder()
                        .behaviorText(chest.getBehavior().getTextValue())
                        .behavior(chest.getBehavior())
                        .chestItems(relatedRewardsToResponseDto(chest.getItems(), animalId));

        return baseRewardToBaseRewardResponseDto(builder, chest);
    }

    public BaseRewardResponseDto itemToRewardResponseDto(Item item, Long animalId) {
        String eventSectionName = item.getEventSection().getName();
        ItemResponseDtoBase.ItemResponseDtoBaseBuilder builder = switch (item.getItemType()) {
            case FLAT_BONUS -> {
                BigDecimal xpBonus = ((FlatBonusItem) item).getXpBonus();
                yield FlatBonusItemResponseDtoBase.builder()
                        .bonusText(String.format(KnowledgeBaseMapper.FLAT_BONUS_ITEM_SUBTITLE, xpBonus, eventSectionName))
                        .shortBonusText(String.format(KnowledgeBaseMapper.FLAT_BONUS_ITEM_SHORT_SUBTITLE, xpBonus, eventSectionName))
                        .xp(xpBonus)
                        .behavior(((FlatBonusItem) item).getBehavior());
            }
            case PERCENTAGE_BONUS -> {
                Integer percentageBonus = ((PercentageBonusItem) item).getPercentageBonus();
                yield PercentageBonusItemResponseDtoBase.builder()
                        .bonusText(String.format(KnowledgeBaseMapper.PERCENTAGE_BONUS_ITEM_SUBTITLE, percentageBonus, eventSectionName))
                        .shortBonusText(String.format(KnowledgeBaseMapper.PERCENTAGE_BONUS_ITEM_SHORT_SUBTITLE, percentageBonus, eventSectionName))
                        .percentage(percentageBonus);
            }
        };

        return baseRewardToBaseRewardResponseDto(
                builder
                        .limit(item.getLimit())
                        .eventSectionId(item.getEventSection().getId())
                        .isLimitReached(assignedRewardService.isLimitReached(item, animalId))
                , item

        );
    }


    public <T extends Reward> List<BaseRewardResponseDto> relatedRewardsToResponseDto(List<T> rewards, Long animalId) {
        return rewards.stream()
                .map(reward -> rewardToRewardResponseDto(reward, animalId))
                .sorted(Comparator.comparing(BaseRewardResponseDto::getOrderIndex))
                .toList();
    }

    public <T extends Reward> List<BaseRewardResponseDto> relatedRewardsToResponseDto(List<T> rewards) {
        return rewards.stream()
                .map(this::rewardToRewardResponseDto)
                .sorted(Comparator.comparing(BaseRewardResponseDto::getOrderIndex))
                .toList();
    }

    public List<EquipmentItemResponseDto> itemsToEquipmentResponseDto(List<Item> items, Long animalId) {
        return items.stream()
                .map(item -> EquipmentItemResponseDto.builder()
                        .base(rewardToRewardResponseDto(item, animalId))
                        .details(Collections.emptyList())
                        .build()
                )
                .toList();
    }

    public List<EquipmentChestResponseDto> chestsToEquipmentResponseDto(List<Chest> chests, Long animalId) {
        return chests.stream()
                .map(chest -> EquipmentChestResponseDto.builder()
                        .base(rewardToRewardResponseDto(chest, animalId))
                        .details(ChestAssignmentDetailsResponseDto.builder().build())
                        .build())
                .toList();
    }

    private <T extends BaseRewardResponseDto.BaseRewardResponseDtoBuilder<?, ?>>
    BaseRewardResponseDto baseRewardToBaseRewardResponseDto(T builder, Reward reward) {
        return builder
                .id(reward.getId())
                .orderIndex(reward.getOrderIndex())
                .name(reward.getName())
                .imageUrl(reward.getImageUrl())
                .build();
    }
}
