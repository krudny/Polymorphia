package com.agh.polymorphia_backend.service.course.reward;

import com.agh.polymorphia_backend.model.course.reward.FlatBonusItem;
import com.agh.polymorphia_backend.model.course.reward.Item;
import com.agh.polymorphia_backend.model.course.reward.PercentageBonusItem;
import com.agh.polymorphia_backend.model.course.reward.assigned.AssignedItem;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@AllArgsConstructor
public class BonusXpCalculator {
    private final AssignedRewardService assignedRewardService;
    private final GradeService gradeService;
    private final OptimalGradeItemMatchingFinder optimalGradeItemMatchingFinder;
    private final HallOfFameService hallOfFameService;

    public void updateAnimalFlatBonusXp(Long animalId) {
        List<Grade> grades = gradeService.getAnimalGrades(animalId);

        if (grades.isEmpty()) {
            return;
        }

        List<AssignedItem> assignedItems = assignedRewardService.getAnimalAssignedItemsByType(animalId, ItemType.FLAT_BONUS);
        Map<FlatBonusItemBehavior, List<AssignedItem>> assignedItemsByBehavior = assignedRewardService.groupFlatBonusItemsByBehavior(assignedItems);
        List<AssignedItem> oneEventItems = Optional.ofNullable(assignedItemsByBehavior.get(FlatBonusItemBehavior.ONE_EVENT))
                .orElse(new ArrayList<>());
        List<AssignedItem> multipleEventsItems = Optional.ofNullable(assignedItemsByBehavior.get(FlatBonusItemBehavior.MULTIPLE_EVENTS))
                .orElse(new ArrayList<>());

        calculateFlatBonusXp(grades, oneEventItems, multipleEventsItems);
        assignedRewardService.saveAssignedItems(oneEventItems);
        assignedRewardService.saveAssignedItems(multipleEventsItems);
    }

    public void updateAnimalPercentageBonusXp(Long animalId) {
        List<StudentScoreDetail> studentScoreDetails = hallOfFameService.getStudentScoreDetails(animalId);
        List<AssignedItem> assignedItems = assignedRewardService.getAnimalAssignedItemsByType(animalId, ItemType.PERCENTAGE_BONUS);
        countPercentageBonusItemBonus(assignedItems, studentScoreDetails);

        assignedRewardService.saveAssignedItems(assignedItems);
    }

    private void calculateFlatBonusXp(List<Grade> grades, List<AssignedItem> oneEventItems, List<AssignedItem> multipleEventsItems) {
        countOneEventItemsBonus(oneEventItems, grades);
        countMultipleEventsItemsBonus(oneEventItems, multipleEventsItems, grades);
    }

    void countMultipleEventsItemsBonus(List<AssignedItem> oneEventItems, List<AssignedItem> multipleEventsItems, List<Grade> grades) {
        if (multipleEventsItems.isEmpty()) {
            return;
        }

        clearAssignedItemsBonusXp(multipleEventsItems);

        Map<Long, BigDecimal> remainingLossByEventSection = getRemainingLossByEventSection(oneEventItems, grades);

        for (AssignedItem item : multipleEventsItems) {
            FlatBonusItem reward = (FlatBonusItem) Hibernate.unproxy(item.getReward());
            Long itemSectionId = reward.getEventSection().getId();

            BigDecimal remainingLossForSection = remainingLossByEventSection.getOrDefault(itemSectionId, BigDecimal.valueOf(0.0));

            if (remainingLossForSection.compareTo(BigDecimal.valueOf(0.0)) > 0) {
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
            BigDecimal currentRemaining = remainingLossByEventSection.getOrDefault(itemSectionId, BigDecimal.valueOf(0.0));
            BigDecimal newRemaining = currentRemaining.subtract(bonusXp).max(BigDecimal.valueOf(0.0));
            remainingLossByEventSection.put(itemSectionId, newRemaining);
        }
        return remainingLossByEventSection;
    }

    private Map<Long, BigDecimal> getRemainingLossByEventSection(List<Grade> grades) {
        return grades.stream()
                .collect(Collectors.groupingBy(
                        g -> g.getGradableEvent().getEventSection().getId(),
                        Collectors.reducing(
                                BigDecimal.valueOf(0.0),
                                this::calculateMissingXpForGrade,
                                BigDecimal::add
                        )
                ));
    }

    void countOneEventItemsBonus(List<AssignedItem> oneEventItems, List<Grade> grades) {
        clearAssignedItemsBonusXp(oneEventItems);

        OptimalGradeItemMatchingFinder.OptimizationResult result = optimalGradeItemMatchingFinder.findOptimalMatching(
                oneEventItems,
                grades
        );
        result.matching().forEach(this::setAssignedOneEventItemBonusXp);
    }


    private void countPercentageBonusItemBonus(List<AssignedItem> percentageBonusItems, List<StudentScoreDetail> studentScoreDetails) {
        clearAssignedItemsBonusXp(percentageBonusItems);
        Map<Long, BigDecimal> totalPointsPerEventSection = studentScoreDetails.stream()
                .collect(
                        Collectors.toMap(StudentScoreDetail::getEventSectionId,
                                scoreDetail -> scoreDetail.getFlatBonus()
                                        .add(scoreDetail.getRawXp()))
                );

        percentageBonusItems
                .forEach(item -> setPercentageBonusItemBonusXp(item, totalPointsPerEventSection));
    }


    private void clearAssignedItemsBonusXp(List<AssignedItem> assignedItems) {
        assignedItems.forEach(assignedItem ->
                assignedItem.setBonusXp(BigDecimal.valueOf(0.0))
        );
    }


    private void setAssignedOneEventItemBonusXp(Grade grade, List<AssignedItem> assignedItems) {
        BigDecimal compensation = BigDecimal.valueOf(0.0);
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

    private void setPercentageBonusItemBonusXp(AssignedItem item, Map<Long, BigDecimal> totalPointsPerEventSection) {
        Long eventSectionId = ((Item) (item.getReward()))
                .getEventSection()
                .getId();

        BigDecimal percentageBonus = BigDecimal.valueOf(
                ((PercentageBonusItem) item.getReward())
                        .getPercentageBonus()
        );

        BigDecimal percentageBonusXp = totalPointsPerEventSection.get(eventSectionId)
                .multiply(percentageBonus)
                .divide(BigDecimal.valueOf(100), RoundingMode.HALF_UP);

        item.setBonusXp(percentageBonusXp);
    }

    private BigDecimal calculateCompensation(AssignedItem assignedFlatBonusItem,
                                             BigDecimal missingXp,
                                             BigDecimal compensation) {
        FlatBonusItem bonusItem = (FlatBonusItem) Hibernate.unproxy(assignedFlatBonusItem.getReward());
        return missingXp.subtract(compensation).min(bonusItem.getXpBonus());
    }

    private BigDecimal calculateMissingXpForGrade(Grade grade) {
        return grade.getCriteriaGrades().stream()
                .map(cg -> cg.getCriterion().getMaxXp().subtract(cg.getXp()))
                .reduce(BigDecimal.valueOf(0.0), BigDecimal::add);
    }

}
