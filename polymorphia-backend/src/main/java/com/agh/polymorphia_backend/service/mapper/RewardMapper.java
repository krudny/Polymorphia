package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.response.reward.BaseRewardResponseDto;
import com.agh.polymorphia_backend.dto.response.reward.chest.ChestResponseDtoBase;
import com.agh.polymorphia_backend.dto.response.reward.item.FlatBonusItemResponseDtoBase;
import com.agh.polymorphia_backend.dto.response.reward.item.ItemResponseDtoBase;
import com.agh.polymorphia_backend.dto.response.reward.item.PercentageBonusItemResponseDtoBase;
import com.agh.polymorphia_backend.model.course.reward.*;
import lombok.AllArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
        ItemResponseDtoBase.ItemResponseDtoBaseBuilder builder = switch (item.getItemType()) {
            case FLAT_BONUS -> FlatBonusItemResponseDtoBase.builder()
                    .bonusText(KnowledgeBaseMapper.FLAT_BONUS_ITEM_SUBTITLE)
                    .xp(((FlatBonusItem) item).getXpBonus())
                    .behavior(((FlatBonusItem) item).getBehavior());
            case PERCENTAGE_BONUS -> PercentageBonusItemResponseDtoBase.builder()
                    .bonusText(KnowledgeBaseMapper.PERCENTAGE_BONUS_ITEM_SUBTITLE)
                    .percentage(((PercentageBonusItem) item).getPercentageBonus());
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
