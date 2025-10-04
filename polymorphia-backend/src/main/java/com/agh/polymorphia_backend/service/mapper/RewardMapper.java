package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.response.equipment.EquipmentChestResponseDto;
import com.agh.polymorphia_backend.dto.response.equipment.EquipmentItemResponseDto;
import com.agh.polymorphia_backend.dto.response.reward.BaseRewardResponseDto;
import com.agh.polymorphia_backend.dto.response.reward.assignment_details.ChestAssignmentDetailsResponseDto;
import com.agh.polymorphia_backend.dto.response.reward.chest.ChestResponseDtoBase;
import com.agh.polymorphia_backend.dto.response.reward.item.FlatBonusItemResponseDtoBase;
import com.agh.polymorphia_backend.dto.response.reward.item.ItemResponseDtoBase;
import com.agh.polymorphia_backend.dto.response.reward.item.PercentageBonusItemResponseDtoBase;
import com.agh.polymorphia_backend.model.course.reward.*;
import lombok.AllArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
@AllArgsConstructor
public class RewardMapper {
    public BaseRewardResponseDto rewardToRewardResponseDto(Reward reward) {
        return switch (reward.getRewardType()) {
            case ITEM -> itemToRewardResponseDto((Item) Hibernate.unproxy(reward));
            case CHEST -> chestToRewardResponseDto((Chest) Hibernate.unproxy(reward));
        };
    }

    public BaseRewardResponseDto chestToRewardResponseDto(Chest chest) {
        ChestResponseDtoBase.ChestResponseDtoBaseBuilder builder =
                ChestResponseDtoBase.builder()
                        .behaviorText(chest.getBehavior().getTextValue())
                        .behavior(chest.getBehavior())
                        .chestItems(relatedRewardsToResponseDto(new ArrayList<>(chest.getItems())));

        return baseRewardToBaseRewardResponseDto(builder, chest);
    }

    public BaseRewardResponseDto itemToRewardResponseDto(Item item) {
        String eventSectionName = item.getEventSection().getName();
        ItemResponseDtoBase.ItemResponseDtoBaseBuilder builder = switch (item.getItemType()) {
            case FLAT_BONUS -> {
                BigDecimal xpBonus = ((FlatBonusItem) item).getXpBonus();
                yield FlatBonusItemResponseDtoBase.builder()
                        .bonusText(String.format(KnowledgeBaseMapper.FLAT_BONUS_ITEM_SUBTITLE, xpBonus, eventSectionName))
                        .xp(xpBonus)
                        .behavior(((FlatBonusItem) item).getBehavior());
            }
            case PERCENTAGE_BONUS -> {
                Integer percentageBonus = ((PercentageBonusItem) item).getPercentageBonus();
                yield PercentageBonusItemResponseDtoBase.builder()
                        .bonusText(String.format(KnowledgeBaseMapper.PERCENTAGE_BONUS_ITEM_SUBTITLE, percentageBonus, eventSectionName))
                        .percentage(percentageBonus);
            }
        };

        return baseRewardToBaseRewardResponseDto(
                builder
                        .limit(item.getLimit())
                        .eventSectionId(item.getEventSection().getId())
                        .isLimitReached(true)
                , item

        );
    }

    public <T extends Reward> List<BaseRewardResponseDto> relatedRewardsToResponseDto(List<T> rewards) {
        return rewards.stream()
                .map(this::rewardToRewardResponseDto)
                .sorted(Comparator.comparing(BaseRewardResponseDto::getOrderIndex))
                .toList();
    }

    public List<EquipmentItemResponseDto> itemsToEquipmentResponseDto(List<Item> items) {
        return items.stream()
                .map(this::itemToEquipmentResponseDto)
                .toList();
    }

    public List<EquipmentChestResponseDto> chestsToEquipmentResponseDto(List<Chest> chests) {
        return chests.stream()
                .map(this::chestsToEquipmentResponseDto)
                .toList();
    }

    private EquipmentChestResponseDto chestsToEquipmentResponseDto(Chest chest) {
        return EquipmentChestResponseDto.builder()
                .base(rewardToRewardResponseDto(chest))
                .details(ChestAssignmentDetailsResponseDto.builder().build())
                .build();
    }

    private EquipmentItemResponseDto itemToEquipmentResponseDto(Item item) {
        return EquipmentItemResponseDto.builder()
                .base(rewardToRewardResponseDto(item))
                .details(Collections.emptyList())
                .build();
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
