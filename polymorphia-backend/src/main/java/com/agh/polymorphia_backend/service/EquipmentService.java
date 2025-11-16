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
import com.agh.polymorphia_backend.service.course.reward.AssignedRewardService;
import com.agh.polymorphia_backend.service.course.reward.BonusXpCalculator;
import com.agh.polymorphia_backend.service.course.reward.PotentialBonusXpCalculator;
import com.agh.polymorphia_backend.service.mapper.AssignedRewardMapper;
import com.agh.polymorphia_backend.service.mapper.RewardMapper;
import com.agh.polymorphia_backend.service.student.AnimalService;
import lombok.AllArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.ZonedDateTime;
import java.util.*;
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
                        assignedRewardMapper.assignedItemsToResponseDto(assignedItems).stream()
                                .sorted(Comparator.comparing(response -> response.getBase().getOrderIndex())),
                        rewardMapper.itemsToEquipmentResponseDto(remainingCourseItems).stream()
                                .sorted(Comparator.comparing(response -> response.getBase().getOrderIndex()))
                )
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
                        assignedChestsResponse.stream()
                                .sorted(Comparator.comparing((EquipmentChestResponseDto response) -> response.getDetails().getReceivedDate())
                                        .thenComparing(response -> response.getBase().getOrderIndex())),
                        rewardMapper.chestsToEquipmentResponseDto(remainingCourseChests).stream()
                                .sorted(Comparator.comparing(response -> response.getBase().getOrderIndex()))
                )
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
            case ALL -> createAssignedItemsFromAssignedChest(animalId, chest, assignedChest, openDate);
        };

        assignedChest.setIsUsed(true);
        assignedChest.setUsedDate(openDate);
        assignedChest.getAssignedItems().addAll(assignedItems);

        assignedRewardService.saveAssignedChest(List.of(assignedChest));
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
       Chest chest=(Chest) Hibernate.unproxy(assignedChest.getReward());
        if (requestDto.getItemId() == null) {
            List<AssignedItem> assignedItems = createNewAssignedItemsFromChest(chest, assignedChest, openDate);

            if(!assignedItems.isEmpty()){
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
            }

            return new ArrayList<>();
        }

        Item item = chest.getItems().stream()
                .map(i -> (Item) Hibernate.unproxy(i))
                .filter(i -> i.getId().equals(requestDto.getItemId()))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, INVALID_ITEM));

        if (assignedRewardService.isLimitReached(item)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ITEM_LIMIT_REACHED);
        }

        return List.of(
                assignedRewardService.createAssignedItem(Optional.of(assignedChest), assignedChest.getCriterionGrade(), item, openDate)
        );
    }

    private List<AssignedItem> createAssignedItemsFromAssignedChest(
            Long animalId,
            Chest chest,
            AssignedChest assignedChest,
            ZonedDateTime openDate
    ) {
        List<AssignedItem> newAssignedItems = createNewAssignedItemsFromChest(chest, assignedChest, openDate);

        List<AssignedItem> currentAssignedItems = assignedRewardService.getAnimalAssignedItems(animalId);
        Map<Long, Long> currentCountById = assignedRewardService.countAssignedItemsByReward(currentAssignedItems)
                .entrySet().stream()
                .collect(Collectors.toMap(entry -> entry.getKey().getId(), Map.Entry::getValue));
        Set<AssignedItem> itemsToRemove = Collections.newSetFromMap(new IdentityHashMap<>());
        assignedRewardService.handleReachedLimitItems(
                newAssignedItems,
                currentCountById,
                item -> item.getReward().getId(),
                item -> ((Item) item.getReward()).getLimit(),
                (item, isOverLimit) -> {
                    if (isOverLimit) {
                        itemsToRemove.add(item);
                    }
                }
        );

        newAssignedItems.removeIf(itemsToRemove::contains);

        return newAssignedItems;
    }

    private List<AssignedItem> createNewAssignedItemsFromChest(Chest chest, AssignedChest assignedChest, ZonedDateTime openDate) {
        return chest
                .getItems().stream()
                .map(i -> (Item) Hibernate.unproxy(i))
                .filter(i -> !assignedRewardService.isLimitReached(i))
                .map(item -> assignedRewardService.createAssignedItem(Optional.of(assignedChest), assignedChest.getCriterionGrade(), item, openDate))
                .collect(Collectors.toList());
    }


    private void setIsLimitReachedForALLChests(List<EquipmentChestResponseDto> assignedChestsResponse, Long animalId) {
        List<AssignedItem> animalAssignedItems = assignedRewardService.getAnimalAssignedItems(animalId);

        Map<Long, Long> currentCountById = assignedRewardService.countAssignedItemsByReward(animalAssignedItems)
                .entrySet().stream()
                .collect(Collectors.toMap(entry -> entry.getKey().getId(), Map.Entry::getValue));

        assignedChestsResponse.forEach(assignedChest -> {
            ChestResponseDtoBase chest = (ChestResponseDtoBase) assignedChest.getBase();
            if (chest.getBehavior().equals(ChestBehavior.ALL)) {
                assignedRewardService.handleReachedLimitItems(
                        chest.getChestItems(),
                        currentCountById,
                        BaseRewardResponseDto::getId,
                        item -> ((ItemResponseDtoBase) item).getLimit(),
                        (item, isOverLimit) ->
                                ((ItemResponseDtoBase) item).setIsLimitReached(isOverLimit)

                );
            }
        });
    }
}

