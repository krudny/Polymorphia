package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.response.equipment.EquipmentChestResponseDto;
import com.agh.polymorphia_backend.dto.response.equipment.EquipmentItemResponseDto;
import com.agh.polymorphia_backend.dto.response.reward.BaseRewardResponseDto;
import com.agh.polymorphia_backend.dto.response.reward.assigned.AssignedRewardResponseDto;
import com.agh.polymorphia_backend.dto.response.reward.assignment_details.BaseRewardAssignmentDetailsResponseDto;
import com.agh.polymorphia_backend.dto.response.reward.assignment_details.ChestAssignmentDetailsResponseDto;
import com.agh.polymorphia_backend.dto.response.reward.assignment_details.ItemAssignmentDetailsResponseDto;
import com.agh.polymorphia_backend.dto.response.reward.chest.ChestResponseDtoBase;
import com.agh.polymorphia_backend.dto.response.reward.item.ItemResponseDtoBase;
import com.agh.polymorphia_backend.model.course.reward.Chest;
import com.agh.polymorphia_backend.model.course.reward.Reward;
import com.agh.polymorphia_backend.model.course.reward.assigned.AssignedChest;
import com.agh.polymorphia_backend.model.course.reward.assigned.AssignedItem;
import com.agh.polymorphia_backend.model.course.reward.assigned.AssignedReward;
import com.agh.polymorphia_backend.model.course.reward.chest.ChestBehavior;
import com.agh.polymorphia_backend.service.course.reward.BonusXpCalculator;
import com.agh.polymorphia_backend.util.NumberFormatter;
import lombok.AllArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AssignedRewardMapper {

    private final RewardMapper rewardMapper;
    private final BonusXpCalculator bonusXpCalculator;

    public List<EquipmentItemResponseDto> assignedItemsToResponseDto(List<AssignedItem> assignedRewards) {
        return assignedRewards.stream()
                .collect(Collectors.groupingBy(AssignedReward::getReward))
                .entrySet().stream()
                .map(this::itemGroupToResponseDto)
                .sorted(Comparator.comparing(dto -> dto.getBase().getOrderIndex()))
                .collect(Collectors.toList());
    }


    public List<EquipmentChestResponseDto> assignedChestsToResponseDto(Long courseId, Long animalId, List<AssignedChest> assignedChests) {
        List<EquipmentChestResponseDto> response = assignedChests.stream()
                .map(this::chestToResponseDto)
                .toList();

        addPotentialXpToResponse(courseId, animalId, assignedChests, response);

        return response;
    }

    private void addPotentialXpToResponse(Long courseId, Long animalId, List<AssignedChest> assignedChests, List<EquipmentChestResponseDto> response) {
        Map<Long, List<BigDecimal>> potentialXpByItem = getCourseItemsPotentialXp(courseId, animalId);
        Map<Long, Map<Long, List<BigDecimal>>> allChestPotentialXp = getALLChestPotentialXp(animalId, assignedChests);

        for (EquipmentChestResponseDto chest : response) {
            ChestResponseDtoBase base = (ChestResponseDtoBase) chest.getBase();

            switch (base.getBehavior()) {
                case ONE_OF_MANY -> setPotentialXpForNotOpenedChests(potentialXpByItem, chest);
                case ALL -> {
                    Map<Long, List<BigDecimal>> potentialBonusALLChest = allChestPotentialXp.get(base.getId());
                    setPotentialXpForNotOpenedChests(potentialBonusALLChest, chest);
                }
            }
        }
    }

    private Map<Long, List<BigDecimal>> getCourseItemsPotentialXp(Long courseId, Long animalId) {
        return bonusXpCalculator.getPotentialBonusXpForCourseItems(courseId, animalId)
                .entrySet().stream()
                .collect(Collectors.toMap(Map.Entry::getKey, entry -> new ArrayList<>(List.of(entry.getValue()))));
    }

    private Map<Long, Map<Long, List<BigDecimal>>> getALLChestPotentialXp(Long animalId, List<AssignedChest> assignedChests) {
        return assignedChests.stream()
                .map(AssignedChest::getReward)
                .filter(reward -> ((Chest) Hibernate.unproxy(reward)).getBehavior() == ChestBehavior.ALL)
                .distinct()
                .collect(Collectors.toMap(
                        Reward::getId,
                        reward -> bonusXpCalculator.getPotentialBonusXpForALLChest(animalId, reward.getId())
                ));
    }


    private void setPotentialXpForNotOpenedChests(Map<Long, List<BigDecimal>> potentialXpByItem, EquipmentChestResponseDto chestDto) {
        if (chestDto.getDetails().getIsUsed()) {
            return;
        }
        ChestResponseDtoBase base = (ChestResponseDtoBase) chestDto.getBase();

        List<BaseRewardResponseDto> updatedItems = new ArrayList<>(base.getChestItems().stream()
                .map(item -> (ItemResponseDtoBase) item)
                .map(item ->
                        item.toBuilder()
                                .potentialXp(
                                        NumberFormatter.formatToBigDecimal(
                                                potentialXpByItem.get(item.getId()).removeFirst()
                                        ))
                                .build()
                )
                .toList());

        base.setChestItems(updatedItems);

    }

    private EquipmentItemResponseDto itemGroupToResponseDto(Map.Entry<Reward, List<AssignedItem>> entry) {
        Reward reward = entry.getKey();
        List<AssignedItem> assignedItems = entry.getValue();

        List<ItemAssignmentDetailsResponseDto> details = assignedItems.stream()
                .map(this::getItemDetailsDto)
                .sorted(Comparator.comparing(BaseRewardAssignmentDetailsResponseDto::getReceivedDate))
                .toList();

        return EquipmentItemResponseDto.builder()
                .base(rewardMapper.rewardToRewardResponseDto(reward))
                .details(details)
                .build();
    }
    private EquipmentChestResponseDto chestToResponseDto(AssignedChest assignedChest) {
        return EquipmentChestResponseDto.builder()
                .base(rewardMapper.rewardToRewardResponseDto(assignedChest.getReward()))
                .details(getChestDetailsDto(assignedChest))
                .build();
    }


    private ItemAssignmentDetailsResponseDto getItemDetailsDto(AssignedItem assignedItem) {
        return ItemAssignmentDetailsResponseDto.builder()
                .id(assignedItem.getId())
                .isUsed(assignedItem.getIsUsed())
                .usedDate(assignedItem.getUsedDate())
                .receivedDate(assignedItem.getReceivedDate())
                .gainedXp(NumberFormatter.formatToString(assignedItem.getBonusXp()))
                .build();
    }


    private ChestAssignmentDetailsResponseDto getChestDetailsDto(AssignedChest assignedChest) {
        List<AssignedRewardResponseDto> receivedItems = assignedChest.getAssignedItems().stream()
                .map(this::itemToAssignedRewardDtoWithType)
                .sorted(Comparator.comparing(response -> response.base().getOrderIndex()))
                .toList();

        return ChestAssignmentDetailsResponseDto.builder()
                .id(assignedChest.getId())
                .isUsed(assignedChest.getIsUsed())
                .usedDate(assignedChest.getUsedDate())
                .receivedDate(assignedChest.getReceivedDate())
                .receivedItems(receivedItems)
                .build();
    }


    private AssignedRewardResponseDto itemToAssignedRewardDtoWithType(AssignedItem assignedItem) {
        return AssignedRewardResponseDto.builder()
                .base(rewardMapper.rewardToRewardResponseDto(assignedItem.getReward()))
                .details(getItemDetailsDto(assignedItem))
                .build();
    }


}
