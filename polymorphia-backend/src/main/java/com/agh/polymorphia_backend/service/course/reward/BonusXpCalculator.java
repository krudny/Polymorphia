package com.agh.polymorphia_backend.service.course.reward;

import com.agh.polymorphia_backend.model.course.reward.FlatBonusItem;
import com.agh.polymorphia_backend.model.course.reward.Item;
import com.agh.polymorphia_backend.model.course.reward.PercentageBonusItem;
import com.agh.polymorphia_backend.model.course.reward.assigned.AssignedItem;
import com.agh.polymorphia_backend.model.course.reward.assigned.AssignedReward;
import com.agh.polymorphia_backend.model.course.reward.item.FlatBonusItemBehavior;
import com.agh.polymorphia_backend.model.course.reward.item.ItemType;
import com.agh.polymorphia_backend.model.gradable_event.Grade;
import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.service.gradable_event.GradeService;
import com.agh.polymorphia_backend.service.hall_of_fame.HallOfFameService;
import com.agh.polymorphia_backend.service.user.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@AllArgsConstructor
public class BonusXpCalculator {
    private final AssignedRewardService assignedRewardService;
    private final GradeService gradeService;
    private final OptimalGradeItemMatchingFinder optimalGradeItemMatchingFinder;
    private final HallOfFameService hallOfFameService;
    private final UserService userService;
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
        return courseItems.stream()
                .collect(Collectors.toMap(
                        Item::getId,
                        item -> switch (item.getItemType()) {
                            case FLAT_BONUS -> getPotentialFlatBonusXp(animalId, (FlatBonusItem) item);
                            case PERCENTAGE_BONUS -> getPotentialPercentageBonusXp((PercentageBonusItem) item);
                        }
                ));
    }

    private void countFlatBonusXp(List<Grade> grades, List<AssignedItem> oneEventItems, List<AssignedItem> multipleEventsItems) {
        countOneEventItemsBonus(oneEventItems, grades);
        countMultipleEventsItemsBonus(oneEventItems, multipleEventsItems, grades);
    }

    private BigDecimal getPotentialPercentageBonusXp(PercentageBonusItem item) {
        User user = userService.getCurrentUser().getUser();
        BigDecimal totalXpSum = hallOfFameService.getStudentEventSectionScoreDetails(user, item.getEventSection().getId()).getFlatBonus();
        BigDecimal percentageBonus = BigDecimal.valueOf(item.getPercentageBonus());
        return totalXpSum.multiply(percentageBonus).divide(BigDecimal.valueOf(100), RoundingMode.HALF_UP);
    }

    private BigDecimal getPotentialFlatBonusXp(Long animalId, FlatBonusItem item) {
        List<Grade> grades = gradeService.getAnimalGrades(animalId);
        List<AssignedItem> oneEventItems = getAnimalItemsByBehavior(animalId, FlatBonusItemBehavior.ONE_EVENT);
        AssignedItem newItem = AssignedItem.builder().reward(item).build();

        if (grades.isEmpty()) {
            return BigDecimal.ZERO;
        }

        List<AssignedItem> oldAssignedItems;
        List<AssignedItem> newAssignedItems;

        switch (item.getBehavior()) {
            case ONE_EVENT -> {
                oldAssignedItems = oneEventItems;
                newAssignedItems = new ArrayList<>(oneEventItems);
                newAssignedItems.add(newItem);
                countOneEventItemsBonus(newAssignedItems, grades);
            }
            case MULTIPLE_EVENTS -> {
                List<AssignedItem> multipleEventsItems = getAnimalItemsByBehavior(animalId, FlatBonusItemBehavior.MULTIPLE_EVENTS)
                        .stream()
                        .sorted(Comparator.comparing(AssignedReward::getReceivedDate))
                        .toList();
                oldAssignedItems = multipleEventsItems;
                newAssignedItems = new ArrayList<>(multipleEventsItems);
                newAssignedItems.add(newItem);
                countMultipleEventsItemsBonus(oneEventItems, newAssignedItems, grades);
            }
            default -> throw new IllegalArgumentException("Unknown behavior: " + item.getBehavior());
        }

        return (getTotalBenefitFromNewFlatBonusItem(newAssignedItems))
                .subtract(getTotalBenefitFromNewFlatBonusItem(oldAssignedItems));
    }

    private BigDecimal getTotalBenefitFromNewFlatBonusItem(List<AssignedItem> assignedItems) {
        return assignedItems.stream()
                .map(AssignedItem::getBonusXp)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private void countMultipleEventsItemsBonus(List<AssignedItem> oneEventItems, List<AssignedItem> multipleEventsItems, List<Grade> grades) {
        if (multipleEventsItems.isEmpty()) {
            return;
        }

        clearAssignedItemsBonusXp(multipleEventsItems);

        BigDecimal totalOneEventCompensation = oneEventItems.stream()
                .map(AssignedItem::getBonusXp)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalLoss = grades.stream()
                .map(this::calculateMissingXpForGrade)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal remainingLoss = totalLoss.subtract(totalOneEventCompensation);

        int i = 0;
        while (remainingLoss.compareTo(BigDecimal.ZERO) > 0 && i < multipleEventsItems.size()) {
            BigDecimal rewardBonusXp = ((FlatBonusItem) Hibernate.unproxy(multipleEventsItems.get(i).getReward())).getXpBonus();
            BigDecimal assignedItemBonusXp = remainingLoss.min(rewardBonusXp);
            multipleEventsItems.get(i).setBonusXp(assignedItemBonusXp);
            remainingLoss = remainingLoss.subtract(assignedItemBonusXp);
            i++;
        }
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
