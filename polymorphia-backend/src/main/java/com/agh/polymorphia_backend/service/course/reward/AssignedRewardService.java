package com.agh.polymorphia_backend.service.course.reward;

import com.agh.polymorphia_backend.model.course.reward.FlatBonusItem;
import com.agh.polymorphia_backend.model.course.reward.Item;
import com.agh.polymorphia_backend.model.course.reward.Reward;
import com.agh.polymorphia_backend.model.course.reward.assigned.AssignedChest;
import com.agh.polymorphia_backend.model.course.reward.assigned.AssignedItem;
import com.agh.polymorphia_backend.model.course.reward.assigned.AssignedReward;
import com.agh.polymorphia_backend.model.course.reward.chest.ChestFilterEnum;
import com.agh.polymorphia_backend.model.course.reward.item.FlatBonusItemBehavior;
import com.agh.polymorphia_backend.model.course.reward.item.ItemType;
import com.agh.polymorphia_backend.model.criterion.CriterionGrade;
import com.agh.polymorphia_backend.repository.course.reward.assigned.AssignedChestRepository;
import com.agh.polymorphia_backend.repository.course.reward.assigned.AssignedItemRepository;

import lombok.AllArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.BiConsumer;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@AllArgsConstructor
public class AssignedRewardService {
    private final AssignedChestRepository assignedChestRepository;
    private final AssignedItemRepository assignedItemRepository;

    private static final String UNOPENED_ASSIGNED_CHEST_NOT_FOUND = "Nie znaleziono nieotwartej skrzynki, przypisanej do zwierzaka, o podanym ID.";

    public List<AssignedChest> getAnimalAssignedChests(Long animalId, ChestFilterEnum chestFilter) {
        return assignedChestRepository.findAnimalAssignedChests(animalId, chestFilter.toString());
    }

    public List<AssignedItem> getAnimalAssignedItems(Long animalId) {
        return assignedItemRepository.findAnimalAssignedItems(animalId);
    }

    public Map<FlatBonusItemBehavior, List<AssignedItem>> groupFlatBonusItemsByBehavior(List<AssignedItem> assignedItems) {
        return filterAssignedItemsByType(assignedItems, ItemType.FLAT_BONUS).stream()
                .sorted(Comparator.comparing(AssignedReward::getReceivedDate))
                .collect(Collectors.groupingBy(
                        assignedItem -> ((FlatBonusItem) Hibernate.unproxy(assignedItem.getReward())).getBehavior(),
                        Collectors.toList()
                ));
    }

    public List<AssignedItem> getAnimalAssignedItemsByType(Long animalId, ItemType itemType) {
        return filterAssignedItemsByType(getAnimalAssignedItems(animalId), itemType);

    }


    public Map<Long, BigDecimal> getTotalBonusByEventSection(List<AssignedItem> assignedItems) {
        Map<Long, BigDecimal> totalBonusByEventSection = new HashMap<>();
        for (AssignedItem assignedItem : assignedItems) {
            Long eventSectionId = ((Item) Hibernate.unproxy(assignedItem.getReward()))
                    .getEventSection()
                    .getId();

            BigDecimal bonusXp = assignedItem.getBonusXp();

            totalBonusByEventSection.merge(eventSectionId, bonusXp, BigDecimal::add);
        }

        return totalBonusByEventSection;
    }

    public AssignedChest getUnopenedAssignedChestByIdWithoutLock(Long assignedChestId) {
        return assignedChestRepository
                .findNotUsedAssignedChestsById(assignedChestId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        UNOPENED_ASSIGNED_CHEST_NOT_FOUND
                ));
    }

    public AssignedChest getUnopenedAssignedChestByIdWithLock(Long assignedChestId) {
        return assignedChestRepository
                .findNotUsedAssignedChestsByIdWithLock(assignedChestId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        UNOPENED_ASSIGNED_CHEST_NOT_FOUND
                ));
    }

    public AssignedItem createAssignedItem(AssignedChest assignedChest, Item item, ZonedDateTime openDate) {
        return AssignedItem.builder()
                .reward(item)
                .assignedChest(assignedChest)
                .reward(item)
                .criterionGrade(assignedChest.getCriterionGrade())
                .isUsed(false)
                .bonusXp(BigDecimal.valueOf(0.0))
                .receivedDate(openDate)
                .build();
    }


    public boolean isLimitReached(Item item, Long animalId) {
        List<AssignedItem> animalAssignedItems = getAnimalAssignedItems(animalId);
        Map<Reward, Long> currentItemsByReward = countAssignedItemsByReward(animalAssignedItems);
        return currentItemsByReward.getOrDefault(item, 0L) >= item.getLimit();
    }

    public Map<Reward, List<AssignedItem>> groupAssignedItemsByReward(List<AssignedItem> assignedItems) {
        return assignedItems.stream()
                .collect(Collectors.groupingBy(AssignedItem::getReward));
    }

    public Map<Reward, Long> countAssignedItemsByReward(List<AssignedItem> assignedItems) {
        return assignedItems.stream()
                .collect(Collectors.groupingBy(AssignedItem::getReward, Collectors.counting()));
    }

    public <T> void handleReachedLimitItems(
            List<T> items,
            Map<Long, Long> currentCountById,
            Function<T, Long> idExtractor,
            Function<T, Integer> limitExtractor,
            BiConsumer<T, Boolean> isLimitReachedSetter
    ) {
        Map<Long, Long> itemCountById = items.stream()
                .collect(Collectors.groupingBy(idExtractor, Collectors.counting()));

        for (int i = items.size() - 1; i >= 0; i--) {
            T item = items.get(i);
            Long itemId = idExtractor.apply(item);
            Integer limit = limitExtractor.apply(item);
            long itemCount = itemCountById.getOrDefault(itemId, 0L)
                    + currentCountById.getOrDefault(itemId, 0L);

            if (itemCount > limit) {
                isLimitReachedSetter.accept(item, true);
                itemCountById.put(itemId, Math.max(itemCountById.getOrDefault(itemId, 0L) - 1, 0L));
            }
        }
    }


    public void saveAssignedChest(AssignedChest chest) {
        assignedChestRepository.save(chest);
    }

    public void saveAssignedItems(List<AssignedItem> items) {
        assignedItemRepository.saveAll(items);
    }

    public List<AssignedItem> filterAssignedItemsByType(List<AssignedItem> assignedItems, ItemType itemType) {
        return assignedItems.stream()
                .filter(item -> ((Item) Hibernate.unproxy(item.getReward())).getItemType().equals(itemType))
                .toList();
    }

    public List<AssignedItem> getAnimalEventSectionAssignedItems(Long animalId, Long eventSectionId) {
        List<AssignedChest> openedChests = getAnimalAssignedChests(animalId, ChestFilterEnum.USED);

        return openedChests.stream()
                .flatMap(chest -> chest.getAssignedItems().stream())
                .filter(assignedItem -> ((Item) Hibernate.unproxy(assignedItem.getReward()))
                        .getEventSection()
                        .getId()
                        .equals(eventSectionId)
                )
                .toList();
    }

    public List<AssignedReward> getCriterionGradeAssignedRewards(CriterionGrade criterionGrade) {
        return Stream.of(
                        assignedItemRepository.findByCriterionGrade(criterionGrade),
                        assignedChestRepository.findByCriterionGrade(criterionGrade)
                )
                .flatMap(List::stream)
                .collect(Collectors.toList());
    }
}
