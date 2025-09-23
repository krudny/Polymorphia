package com.agh.polymorphia_backend.service.course.reward;

import com.agh.polymorphia_backend.model.course.reward.FlatBonusItem;
import com.agh.polymorphia_backend.model.course.reward.Item;
import com.agh.polymorphia_backend.model.course.reward.assigned.AssignedItem;
import com.agh.polymorphia_backend.model.course.reward.assigned.AssignedReward;
import com.agh.polymorphia_backend.model.course.reward.item.FlatBonusItemBehavior;
import com.agh.polymorphia_backend.model.course.reward.item.ItemType;
import com.agh.polymorphia_backend.model.criterion.CriterionGrade;
import com.agh.polymorphia_backend.service.gradable_event.CriterionGradeService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class BonusXpCalculator {
    private final AssignedRewardService assignedRewardService;
    private final CriterionGradeService criterionGradeService;
    private final HungarianMethodService hungarianMethodService;

    public void countFlatBonusXp(Long animalId) {
        List<AssignedItem> oneEventItems = getBehaviorItems(animalId, FlatBonusItemBehavior.ONE_EVENT);

        List<CriterionGrade> criteriaGrades = criterionGradeService.getAnimalCriteriaGrades(animalId);
        if (criteriaGrades.isEmpty()) {
            return;
        }

        countOneEventItemsBonus(oneEventItems, criteriaGrades);
        countMultipleEventsItemsBonus(animalId, oneEventItems, criteriaGrades);

    }

    private void countMultipleEventsItemsBonus(Long animalId, List<AssignedItem> oneEventItems, List<CriterionGrade> criteriaGrades) {
        List<AssignedItem> multipleEventsItems = getBehaviorItems(animalId, FlatBonusItemBehavior.MULTIPLE_EVENTS)
                .stream()
                .sorted(Comparator.comparing(AssignedReward::getReceivedDate))
                .toList();

        if (multipleEventsItems.isEmpty()) {
            return;
        }

        clearAssignedItemsBonusXp(multipleEventsItems);

        BigDecimal totalOneEventCompensation = oneEventItems.stream()
                .map(AssignedItem::getBonusXp)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalLoss = criteriaGrades.stream()
                .map(criterionGrade -> criterionGrade.getCriterion().getMaxXp().subtract(criterionGrade.getXp()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal remainingLoss = totalLoss.subtract(totalOneEventCompensation);

        int i = 0;
        while (remainingLoss.compareTo(BigDecimal.ZERO) > 0 && i < multipleEventsItems.size()) {
            BigDecimal rewardBonusXp = ((FlatBonusItem) multipleEventsItems.get(i).getReward()).getXpBonus();
            BigDecimal assignedItemBonusXp = remainingLoss.min(rewardBonusXp);
            multipleEventsItems.get(i).setBonusXp(assignedItemBonusXp);
            remainingLoss = remainingLoss.subtract(assignedItemBonusXp);
            i++;
        }
        assignedRewardService.saveAssignedItems(multipleEventsItems);
    }

    private void countOneEventItemsBonus(List<AssignedItem> oneEventItems, List<CriterionGrade> criteriaGrades) {
        clearAssignedItemsBonusXp(oneEventItems);

        HungarianMethodService.HungarianMethodResult result = hungarianMethodService.findOptimalMatchingUsingHungarian(
                oneEventItems,
                criteriaGrades
        );
        result.matching().forEach(this::setAssignedOneEventItemBonusXp);
        assignedRewardService.saveAssignedItems(oneEventItems);
    }

    private void clearAssignedItemsBonusXp(List<AssignedItem> assignedItems) {
        assignedItems.forEach(assignedItem ->
                assignedItem.setBonusXp(BigDecimal.valueOf(0.0))
        );
    }

    private List<AssignedItem> getBehaviorItems(Long animalId, FlatBonusItemBehavior behavior) {
        return getFlatBonusItems(animalId).stream()
                .filter(assignedItem -> ((FlatBonusItem) Hibernate.unproxy(assignedItem.getReward())).getBehavior().equals(behavior))
                .toList();
    }

    private List<AssignedItem> getFlatBonusItems(Long animalId) {
        return assignedRewardService.getAnimalAssignedItems(animalId)
                .stream()
                .filter(item -> ((Item) Hibernate.unproxy(item.getReward())).getItemType().equals(ItemType.FLAT_BONUS))
                .toList();
    }

    private void setAssignedOneEventItemBonusXp(CriterionGrade criterionGrade, AssignedItem assignedItem) {
        assignedItem.setBonusXp(hungarianMethodService.calculateCompensation(assignedItem, criterionGrade));
    }


}
