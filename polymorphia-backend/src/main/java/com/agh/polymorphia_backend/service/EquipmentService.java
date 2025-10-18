package com.agh.polymorphia_backend.service;

import com.agh.polymorphia_backend.dto.request.equipment.EquipmentChestOpenRequestDto;
import com.agh.polymorphia_backend.dto.response.equipment.EquipmentChestResponseDto;
import com.agh.polymorphia_backend.dto.response.equipment.EquipmentItemResponseDto;
import com.agh.polymorphia_backend.dto.response.equipment.potential_xp.ChestPotentialXpResponseDtoWithType;
import com.agh.polymorphia_backend.dto.response.reward.BaseRewardResponseDto;
import com.agh.polymorphia_backend.dto.response.reward.chest.ChestResponseDtoBase;
import com.agh.polymorphia_backend.dto.response.reward.item.ItemResponseDtoBase;
import com.agh.polymorphia_backend.model.course.reward.Chest;
import com.agh.polymorphia_backend.model.course.reward.Item;
import com.agh.polymorphia_backend.model.course.reward.assigned.AssignedChest;
import com.agh.polymorphia_backend.model.course.reward.assigned.AssignedItem;
import com.agh.polymorphia_backend.model.course.reward.assigned.AssignedReward;
import com.agh.polymorphia_backend.model.course.reward.chest.ChestBehavior;
import com.agh.polymorphia_backend.repository.course.reward.ChestRepository;
import com.agh.polymorphia_backend.repository.course.reward.ItemRepository;
import com.agh.polymorphia_backend.service.course.AnimalService;
import com.agh.polymorphia_backend.service.course.reward.AssignedRewardService;
import com.agh.polymorphia_backend.service.course.reward.BonusXpCalculator;
import com.agh.polymorphia_backend.service.course.reward.PotentialBonusXpCalculator;
import com.agh.polymorphia_backend.service.mapper.AssignedRewardMapper;
import com.agh.polymorphia_backend.service.mapper.RewardMapper;
import lombok.AllArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.ZonedDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@AllArgsConstructor
public class EquipmentService {
    private static final String INVALID_ITEM = "Item not found in the chest";
    private static final String ITEM_LIMIT_REACHED = "Item limit reached";
    private final AnimalService animalService;
    private final AssignedRewardService assignedRewardService;
    private final AssignedRewardMapper assignedRewardMapper;
    private final BonusXpCalculator bonusXpCalculator;
    private final ChestRepository chestRepository;
    private final RewardMapper rewardMapper;
    private final ItemRepository itemRepository;
    private final PotentialBonusXpCalculator potentialBonusXpCalculator;

    public List<EquipmentItemResponseDto> getEquipmentItems(Long courseId) {
        Long animalId = animalService.validateAndGetAnimalId(courseId);
        List<AssignedItem> assignedItems = assignedRewardService.getAnimalAssignedItems(animalId);
        List<Long> assignedItemIds = getAssignedRewardsIds(assignedItems);
        List<Item> remainingCourseItems = itemRepository.findAllByCourseIdAndItemIdNotIn(courseId, assignedItemIds);


        return Stream.concat(
                        assignedRewardMapper.assignedItemsToResponseDto(assignedItems).stream(),
                        rewardMapper.itemsToEquipmentResponseDto(remainingCourseItems).stream()
                )
                .sorted(Comparator.comparing(response -> response.getBase().getOrderIndex()))
                .toList();
    }

    public List<EquipmentChestResponseDto> getEquipmentChests(Long courseId) {
        Long animalId = animalService.validateAndGetAnimalId(courseId);
        List<AssignedChest> assignedChests = assignedRewardService.getAnimalAssignedChests(animalId);
        List<Long> assignedChestIds = getAssignedRewardsIds(assignedChests);
        List<Chest> remainingCourseChests = chestRepository.findAllByCourseIdAndChestIdNotIn(courseId, assignedChestIds);
        List<EquipmentChestResponseDto> assignedChestsResponse = assignedRewardMapper.assignedChestsToResponseDto(assignedChests);
        setIsLimitReachedForALLChests(assignedChestsResponse, animalId);

        return Stream.concat(
                        assignedChestsResponse.stream(),
                        rewardMapper.chestsToEquipmentResponseDto(remainingCourseChests).stream()
                )
                .sorted(Comparator.comparing(response -> response.getBase().getOrderIndex()))
                .toList();
    }


    public ChestPotentialXpResponseDtoWithType getPotentialXpForChest(Long courseId, Long assignedChestId) {
        Long animalId = animalService.validateAndGetAnimalId(courseId);
        AssignedChest assignedChest = assignedRewardService.getAssignedChestByIdAndAnimalId(
                assignedChestId,
                animalId
        );

        Chest chest = (Chest) Hibernate.unproxy(assignedChest.getReward());

        return switch (chest.getBehavior()) {
            case ALL -> potentialBonusXpCalculator.getPotentialBonusXpForALLChest(animalId, chest);
            case ONE_OF_MANY -> potentialBonusXpCalculator.getPotentialBonusXpForONEChest(animalId, chest);
        };
    }

    @Transactional
    public void openChest(Long courseId, EquipmentChestOpenRequestDto requestDto) {
        Long animalId = animalService.validateAndGetAnimalId(courseId);
        AssignedChest assignedChest = assignedRewardService.getAssignedChestByIdAndAnimalId(
                requestDto.getAssignedChestId(),
                animalId
        );

        ZonedDateTime openDate = ZonedDateTime.now();
        Chest chest = (Chest) Hibernate.unproxy(assignedChest.getReward());

        List<AssignedItem> assignedItems = switch (chest.getBehavior()) {
            case ONE_OF_MANY -> createAssignedItemsFromRequest(requestDto, assignedChest, openDate);
            case ALL -> createAssignedItemsFromAssignedChest(chest, assignedChest, openDate);
        };

        assignedChest.setIsUsed(true);
        assignedChest.setUsedDate(openDate);
        assignedChest.getAssignedItems().addAll(assignedItems);

        assignedRewardService.saveAssignedChest(assignedChest);
        assignedRewardService.saveAssignedItems(assignedItems);
        bonusXpCalculator.updateAnimalFlatBonusXp(animalId);
        bonusXpCalculator.updateAnimalPercentageBonusXp(animalId);

    }

    private List<Long> getAssignedRewardsIds(List<? extends AssignedReward> assignedRewards) {
        return assignedRewards.stream()
                .map(assignedReward -> assignedReward.getReward().getId())
                .toList();
    }

    private List<AssignedItem> createAssignedItemsFromRequest(EquipmentChestOpenRequestDto requestDto, AssignedChest assignedChest, ZonedDateTime openDate) {
        if (requestDto.getItemId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        Item item = ((Chest) Hibernate.unproxy(assignedChest.getReward())).getItems().stream()
                .map(i -> (Item) Hibernate.unproxy(i))
                .filter(i -> i.getId().equals(requestDto.getItemId()))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, INVALID_ITEM));

        if (assignedRewardService.isLimitReached(item)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ITEM_LIMIT_REACHED);
        }

        return List.of(
                assignedRewardService.createAssignedItem(assignedChest, item, openDate)
        );
    }

    private List<AssignedItem> createAssignedItemsFromAssignedChest(Chest chest, AssignedChest assignedChest, ZonedDateTime openDate) {
        return chest
                .getItems().stream()
                .map(i -> (Item) Hibernate.unproxy(i))
                .filter(i -> !assignedRewardService.isLimitReached(i))
                .map(item -> assignedRewardService.createAssignedItem(assignedChest, item, openDate))
                .toList();
    }

    private void setIsLimitReachedForALLChests(List<EquipmentChestResponseDto> assignedChestsResponse, Long animalId) {
        assignedChestsResponse.forEach(assignedChest ->
                {
                    ChestResponseDtoBase chest = (ChestResponseDtoBase) assignedChest.getBase();
                    if (chest.getBehavior().equals(ChestBehavior.ALL)) {
                        setIsLimitReached(chest.getChestItems(), animalId);
                    }
                }
        );
    }

    private void setIsLimitReached(List<BaseRewardResponseDto> items, Long animalId) {
        Map<Long, Long> itemCountById = countItemsById(items);
        List<AssignedItem> animalAssignedItems = assignedRewardService.getAnimalAssignedItems(animalId);
        Map<Long, Long> assignedItemCountById = assignedRewardService.countAssignedItemsByReward(animalAssignedItems)
                .entrySet().stream()
                .collect(Collectors.toMap(entry -> entry.getKey().getId(), Map.Entry::getValue));

        for (int i = items.size() - 1; i >= 0; i--) {
            ItemResponseDtoBase item = (ItemResponseDtoBase) items.get(i);
            Integer limit = item.getLimit();
            long itemCount = itemCountById.getOrDefault(item.getId(), 0L)
                    + assignedItemCountById.getOrDefault(item.getId(), 0L);

            if (itemCount > limit) {
                item.setIsLimitReached(true);
                itemCountById.put(item.getId(), itemCount - 1);
            }
        }
    }

    private Map<Long, Long> countItemsById(List<BaseRewardResponseDto> items) {
        return items.stream()
                .collect(Collectors.groupingBy(BaseRewardResponseDto::getId, Collectors.counting()));
    }
}

