package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.response.equipment.EquipmentChestResponseDto;
import com.agh.polymorphia_backend.dto.response.equipment.EquipmentItemResponseDto;
import com.agh.polymorphia_backend.dto.response.reward.assigned.AssignedRewardResponseDto;
import com.agh.polymorphia_backend.dto.response.reward.assignment_details.BaseRewardAssignmentDetailsResponseDto;
import com.agh.polymorphia_backend.dto.response.reward.assignment_details.ChestAssignmentDetailsResponseDto;
import com.agh.polymorphia_backend.dto.response.reward.assignment_details.ItemAssignmentDetailsResponseDto;
import com.agh.polymorphia_backend.model.course.reward.Reward;
import com.agh.polymorphia_backend.model.course.reward.assigned.AssignedChest;
import com.agh.polymorphia_backend.model.course.reward.assigned.AssignedItem;
import com.agh.polymorphia_backend.model.course.reward.assigned.AssignedReward;
import com.agh.polymorphia_backend.util.NumberFormatter;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AssignedRewardMapper {

    private final RewardMapper rewardMapper;

    public List<EquipmentItemResponseDto> assignedItemsToResponseDto(List<AssignedItem> assignedRewards) {
        return assignedRewards.stream()
                .collect(Collectors.groupingBy(AssignedReward::getReward))
                .entrySet().stream()
                .map(this::itemGroupToResponseDto)
                .sorted(Comparator.comparing(dto -> dto.getBase().getOrderIndex()))
                .collect(Collectors.toList());
    }


    public List<EquipmentChestResponseDto> assignedChestsToResponseDto(List<AssignedChest> assignedChests) {
        return assignedChests.stream()
                .map(this::chestToResponseDto)
                .toList();
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
