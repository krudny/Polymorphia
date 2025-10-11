package com.agh.polymorphia_backend.service.course.reward;

import com.agh.polymorphia_backend.model.course.reward.FlatBonusItem;
import com.agh.polymorphia_backend.model.course.reward.Item;
import com.agh.polymorphia_backend.model.course.reward.PercentageBonusItem;
import com.agh.polymorphia_backend.model.course.reward.assigned.AssignedItem;
import com.agh.polymorphia_backend.model.course.reward.assigned.AssignedReward;
import com.agh.polymorphia_backend.model.course.reward.item.FlatBonusItemBehavior;
import com.agh.polymorphia_backend.model.course.reward.item.ItemType;
import com.agh.polymorphia_backend.model.gradable_event.Grade;
import com.agh.polymorphia_backend.model.hall_of_fame.StudentScoreDetail;
import com.agh.polymorphia_backend.service.gradable_event.GradeService;
import com.agh.polymorphia_backend.service.hall_of_fame.HallOfFameService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@AllArgsConstructor
public class BonusXpCalculator {
    private final AssignedRewardService assignedRewardService;
    private final GradeService gradeService;
    private final OptimalGradeItemMatchingFinder optimalGradeItemMatchingFinder;
    private final HallOfFameService hallOfFameService;
    private final RewardService rewardService;


    public void updateAnimalFlatBonusXp(Long animalId) {
        List<Grade> grades = gradeService.getAnimalGrades(animalId);

        if (grades.isEmpty()) {
            return;
        }

        List<AssignedItem> oneEventItems = getAnimalItemsByBehavior(animalId, FlatBonusItemBehavior.ONE_EVENT);
        List<AssignedItem> multipleEventsItems = getAnimalItemsByBehavior(animalId, FlatBonusItemBehavior.MULTIPLE_EVENTS)
                .stream()
                .sorted(Comparator.comparing(AssignedReward::getReceivedDate))
                .toList();

        countFlatBonusXp(grades, oneEventItems, multipleEventsItems);
        assignedRewardService.saveAssignedItems(oneEventItems);
        assignedRewardService.saveAssignedItems(multipleEventsItems);
    }


    public Map<Long, BigDecimal> getPotentialBonusXpForCourseItems(Long courseId, Long animalId) {
        List<Item> courseItems = rewardService.getCourseItems(courseId);
        Map<Long, BigDecimal> totalXpWithFlatBonusByEventSection = hallOfFameService.getStudentScoreDetails(animalId).stream()
                .collect(Collectors.toMap(StudentScoreDetail::getEventSectionId,
                        studentScoreDetail ->
                                studentScoreDetail.getFlatBonus().add(studentScoreDetail.getRawXp())));

        return courseItems.stream()
                .collect(Collectors.toMap(
                        Item::getId,
                        item -> switch (item.getItemType()) {
                            case FLAT_BONUS -> getPotentialFlatBonusXp(animalId, List.of((FlatBonusItem) item));
                            case PERCENTAGE_BONUS ->
                                    getPotentialPercentageBonusXp(totalXpWithFlatBonusByEventSection, (PercentageBonusItem) item);
                        }
                ));
    }

    public Map<Long, List<BigDecimal>> getPotentialBonusXpForALLChest(Long animalId, Long chestId) {
        List<Item> items = rewardService.getChestItems(chestId);

        Map<Long, List<BigDecimal>> result = new HashMap<>();

        calculateALLChestFlatBonusXp(items, animalId, result);
        calculateALLChestPercentageBonusXp(items, animalId, result);

        return result;
    }

    private void calculateALLChestFlatBonusXp(List<Item> items, Long animalId, Map<Long, List<BigDecimal>> result) {
        List<FlatBonusItem> flatBonusItems = items.stream()
                .filter(item -> item.getItemType().equals(ItemType.FLAT_BONUS))
                .map(item -> (FlatBonusItem) item)
                .toList();

        if (flatBonusItems.isEmpty()) {
            return;
        }

        BigDecimal cumulativeXp = getPotentialFlatBonusXp(animalId, Collections.emptyList());
        List<FlatBonusItem> itemsSoFar = new ArrayList<>();

        for (FlatBonusItem item : flatBonusItems) {
            itemsSoFar.add(item);

            BigDecimal newXp = getPotentialFlatBonusXp(animalId, new ArrayList<>(itemsSoFar));
            BigDecimal marginalGain = newXp.subtract(cumulativeXp);

            result.computeIfAbsent(item.getId(), k -> new ArrayList<>())
                    .add(marginalGain);
            cumulativeXp = newXp;
        }
    }

    private void calculateALLChestPercentageBonusXp(List<Item> items, Long animalId,
                                                    Map<Long, List<BigDecimal>> result) {

        List<PercentageBonusItem> percentageBonusItems = items.stream()
                .filter(item -> item.getItemType().equals(ItemType.PERCENTAGE_BONUS))
                .map(item -> (PercentageBonusItem) item)
                .toList();

        Map<Long, BigDecimal> totalXpWithFlatBonusByEventSection = getTotalXpWithFlatBonusByEventSection(animalId, result);

        for (PercentageBonusItem item : percentageBonusItems) {
            BigDecimal bonus = getPotentialPercentageBonusXp(totalXpWithFlatBonusByEventSection, item);
            result.computeIfAbsent(item.getId(), k -> new ArrayList<>())
                    .add(bonus);
        }
    }

    private Map<Long, BigDecimal> getTotalXpWithFlatBonusByEventSection(Long animalId, Map<Long, List<BigDecimal>> result) {
        return hallOfFameService.getStudentScoreDetails(animalId).stream()
                .collect(Collectors.toMap(
                        StudentScoreDetail::getEventSectionId,
                        studentScoreDetail -> {
                            List<BigDecimal> bonuses = result.get(studentScoreDetail.getEventSectionId());

                            BigDecimal totalBonus = (bonuses == null)
                                    ? BigDecimal.ZERO
                                    : bonuses.stream()
                                    .reduce(BigDecimal.ZERO, BigDecimal::add);

                            return totalBonus.add(studentScoreDetail.getRawXp());
                        }
                ));
    }

    private void countFlatBonusXp(List<Grade> grades, List<AssignedItem> oneEventItems, List<AssignedItem> multipleEventsItems) {
        countOneEventItemsBonus(oneEventItems, grades);
        countMultipleEventsItemsBonus(oneEventItems, multipleEventsItems, grades);
    }

    private BigDecimal getPotentialPercentageBonusXp(Map<Long, BigDecimal> totalXpWithFLatBonusByEventSection, PercentageBonusItem item) {
        BigDecimal bonus = BigDecimal.valueOf(item.getPercentageBonus());

        return totalXpWithFLatBonusByEventSection.get(item.getEventSection().getId())
                .multiply(bonus)
                .divide(BigDecimal.valueOf(100), RoundingMode.HALF_UP);

    }


    private BigDecimal getPotentialFlatBonusXp(Long animalId, List<FlatBonusItem> items) {
        List<Grade> grades = gradeService.getAnimalGrades(animalId);
        if (grades.isEmpty()) {
            return BigDecimal.ZERO;
        }

        List<AssignedItem> oneEventItems = getAnimalItemsByBehavior(animalId, FlatBonusItemBehavior.ONE_EVENT);
        List<AssignedItem> multipleEventsItems = getAnimalItemsByBehavior(animalId, FlatBonusItemBehavior.MULTIPLE_EVENTS)
                .stream()
                .sorted(Comparator.comparing(AssignedReward::getReceivedDate))
                .toList();

        List<AssignedItem> newOneEventAssignedItems = new ArrayList<>(oneEventItems);
        List<AssignedItem> newMultipleEventsItems = new ArrayList<>(multipleEventsItems);


        for (FlatBonusItem item : items) {
            switch (item.getBehavior()) {
                case ONE_EVENT: {
                    newOneEventAssignedItems.add(AssignedItem.builder().reward(item).build());
                    break;
                }
                case MULTIPLE_EVENTS: {
                    newMultipleEventsItems.add(AssignedItem.builder().reward(item).build());
                }
            }
        }

        countOneEventItemsBonus(newOneEventAssignedItems, grades);
        countMultipleEventsItemsBonus(newOneEventAssignedItems, newMultipleEventsItems, grades);

        return getTotalBenefitFromFlatBonus(newOneEventAssignedItems)
                .add(getTotalBenefitFromFlatBonus(newMultipleEventsItems))
                .subtract(getTotalBenefitFromFlatBonus(oneEventItems))
                .subtract(getTotalBenefitFromFlatBonus(multipleEventsItems));
    }

    private BigDecimal getTotalBenefitFromFlatBonus(List<AssignedItem> assignedItems) {
        return assignedItems.stream()
                .map(AssignedItem::getBonusXp)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private void countMultipleEventsItemsBonus(List<AssignedItem> oneEventItems, List<AssignedItem> multipleEventsItems, List<Grade> grades) {
        if (multipleEventsItems.isEmpty()) {
            return;
        }

        clearAssignedItemsBonusXp(multipleEventsItems);

        Map<Long, BigDecimal> remainingLossByEventSection = getRemainingLossByEventSection(oneEventItems, grades);

        for (AssignedItem item : multipleEventsItems) {
            FlatBonusItem reward = (FlatBonusItem) Hibernate.unproxy(item.getReward());
            Long itemSectionId = reward.getEventSection().getId();

            BigDecimal remainingLossForSection = remainingLossByEventSection.getOrDefault(itemSectionId, BigDecimal.ZERO);

            if (remainingLossForSection.compareTo(BigDecimal.ZERO) > 0) {
                BigDecimal rewardBonusXp = reward.getXpBonus();
                BigDecimal assignedItemBonusXp = remainingLossForSection.min(rewardBonusXp);
                item.setBonusXp(assignedItemBonusXp);

                remainingLossByEventSection.put(itemSectionId, remainingLossForSection.subtract(assignedItemBonusXp));
            }
        }
    }

    private Map<Long, BigDecimal> getRemainingLossByEventSection(List<AssignedItem> oneEventItems, List<Grade> grades) {
        Map<Long, BigDecimal> remainingLossByEventSection = getRemainingLossByEventSection(grades);

        for (AssignedItem item : oneEventItems) {
            FlatBonusItem reward = (FlatBonusItem) Hibernate.unproxy(item.getReward());
            Long itemSectionId = reward.getEventSection().getId();

            BigDecimal bonusXp = item.getBonusXp();
            BigDecimal currentRemaining = remainingLossByEventSection.getOrDefault(itemSectionId, BigDecimal.ZERO);
            BigDecimal newRemaining = currentRemaining.subtract(bonusXp).max(BigDecimal.ZERO);
            remainingLossByEventSection.put(itemSectionId, newRemaining);
        }
        return remainingLossByEventSection;
    }

    private Map<Long, BigDecimal> getRemainingLossByEventSection(List<Grade> grades) {
        return grades.stream()
                .collect(Collectors.groupingBy(
                        g -> g.getGradableEvent().getEventSection().getId(),
                        Collectors.reducing(
                                BigDecimal.ZERO,
                                this::calculateMissingXpForGrade,
                                BigDecimal::add
                        )
                ));
    }

    private void countOneEventItemsBonus(List<AssignedItem> oneEventItems, List<Grade> grades) {
        clearAssignedItemsBonusXp(oneEventItems);

        OptimalGradeItemMatchingFinder.OptimizationResult result = optimalGradeItemMatchingFinder.findOptimalMatching(
                oneEventItems,
                grades
        );
        result.matching().forEach(this::setAssignedOneEventItemBonusXp);
    }

    private void clearAssignedItemsBonusXp(List<AssignedItem> assignedItems) {
        assignedItems.forEach(assignedItem ->
                assignedItem.setBonusXp(BigDecimal.valueOf(0.0))
        );
    }

    private List<AssignedItem> getAnimalItemsByBehavior(Long animalId, FlatBonusItemBehavior behavior) {
        return getAnimalFlatBonusItems(animalId).stream()
                .filter(assignedItem -> ((FlatBonusItem) Hibernate.unproxy(assignedItem.getReward())).getBehavior().equals(behavior))
                .toList();
    }

    private List<AssignedItem> getAnimalFlatBonusItems(Long animalId) {
        return assignedRewardService.getAnimalAssignedItems(animalId)
                .stream()
                .filter(item -> ((Item) Hibernate.unproxy(item.getReward())).getItemType().equals(ItemType.FLAT_BONUS))
                .toList();
    }

    private void setAssignedOneEventItemBonusXp(Grade grade, List<AssignedItem> assignedItems) {
        BigDecimal compensation = BigDecimal.ZERO;
        BigDecimal missingXp = calculateMissingXpForGrade(grade);

        for (AssignedItem assignedItem : assignedItems) {
            if (compensation.compareTo(missingXp) >= 0) {
                break;
            }
            BigDecimal bonusXp = calculateCompensation(assignedItem, missingXp, compensation);
            assignedItem.setBonusXp(bonusXp);
            compensation = compensation.add(bonusXp);
        }
    }

    private BigDecimal calculateCompensation(AssignedItem item,
                                             BigDecimal missingXp,
                                             BigDecimal compensation) {
        FlatBonusItem bonusItem = (FlatBonusItem) Hibernate.unproxy(item.getReward());
        return missingXp.subtract(compensation).min(bonusItem.getXpBonus());
    }

    private BigDecimal calculateMissingXpForGrade(Grade grade) {
        return grade.getCriteriaGrades().stream()
                .map(cg -> cg.getCriterion().getMaxXp().subtract(cg.getXp()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

}
