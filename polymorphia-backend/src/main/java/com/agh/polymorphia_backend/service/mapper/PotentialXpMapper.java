package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.response.equipment.potential_xp.ChestPotentialXpResponseDto;
import com.agh.polymorphia_backend.dto.response.equipment.potential_xp.PotentialBonusXpResponseDto;
import com.agh.polymorphia_backend.model.course.reward.Reward;
import com.agh.polymorphia_backend.model.course.reward.assigned.AssignedItem;
import com.agh.polymorphia_backend.service.course.reward.AssignedRewardService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.IdentityHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class PotentialXpMapper {

    private final AssignedRewardService assignedRewardService;

    public PotentialBonusXpResponseDto combineSummaries(
            PotentialBonusXpResponseDto summary1,
            PotentialBonusXpResponseDto summary2
    ) {
        BigDecimal totalBonus = summary1.getBonusXp().add(summary2.getBonusXp());

        BigDecimal totalLoss = Optional.ofNullable(summary1.getLossXp()).orElse(BigDecimal.valueOf(0.0))
                .add(Optional.ofNullable(summary2.getLossXp()).orElse(BigDecimal.valueOf(0.0)));

        return toChestPotentialXpResponseDto(totalBonus, Optional.of(totalLoss));
    }

    public Map<String, PotentialBonusXpResponseDto> assignedItemsToItemDetails(List<AssignedItem> newAssignedItems, Optional<BigDecimal> lossXp) {
        Map<Reward, List<AssignedItem>> groupedItems = assignedRewardService.groupAssignedItemsByReward(newAssignedItems);

        Map<AssignedItem, Long> itemToIndexMap = new IdentityHashMap<>();
        for (Map.Entry<Reward, List<AssignedItem>> entry : groupedItems.entrySet()) {
            List<AssignedItem> itemsInGroup = entry.getValue();
            for (int i = 0; i < itemsInGroup.size(); i++) {
                itemToIndexMap.put(itemsInGroup.get(i), (long) i);
            }
        }

        return newAssignedItems.stream()
                .collect(Collectors.toMap(
                        assignedItem -> {
                            Long rewardId = assignedItem.getReward().getId();
                            Long indexInGroup = itemToIndexMap.get(assignedItem);
                            return rewardId + "_" + indexInGroup;
                        },
                        assignedItem -> toChestPotentialXpResponseDto(assignedItem.getBonusXp(), lossXp)
                ));
    }

    public ChestPotentialXpResponseDto toEmptyChestPotentialXpResponseDto() {
        PotentialBonusXpResponseDto summary = toChestPotentialXpResponseDto(BigDecimal.valueOf(0.0), Optional.of(BigDecimal.valueOf(0.0)));

        return ChestPotentialXpResponseDto.builder()
                .summary(summary)
                .itemDetails(Map.of())
                .build();
    }

    public PotentialBonusXpResponseDto toChestPotentialXpResponseDto(BigDecimal bonusXp, Optional<BigDecimal> lossXp) {
        return PotentialBonusXpResponseDto.builder()
                .bonusXp(bonusXp)
                .lossXp(lossXp.orElse(null))
                .totalBonusXp(lossXp.map(bonusXp::subtract).orElse(null))
                .build();
    }
}