package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.response.reward.assigned.AssignedRewardResponseDto;
import com.agh.polymorphia_backend.dto.response.reward.points_summary.PointsSummaryDetailsResponseDto;
import com.agh.polymorphia_backend.dto.response.reward.points_summary.PointsSummaryResponseDto;
import com.agh.polymorphia_backend.model.course.reward.assigned.AssignedItem;
import com.agh.polymorphia_backend.model.hall_of_fame.StudentScoreDetail;
import com.agh.polymorphia_backend.service.course.reward.BonusXpCalculator;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;

@Service
@AllArgsConstructor
public class PointsSummaryMapper {
    private static final String GAINED = "Zdobyte xp";
    private static final String FLAT_BONUS = "Bonusy punktowe";
    private static final String PERCENTAGE_BONUS = "Bonusy procentowe";
    private static final String TOTAL = "Łącznie";
    private final AssignedRewardMapper assignedRewardMapper;
    private final BonusXpCalculator bonusXpCalculator;

    public PointsSummaryResponseDto toPointsSummaryResponseDto(
            StudentScoreDetail studentScoreDetail,
            List<AssignedItem> flatBonusItems,
            List<AssignedItem> percentageBonusItems
    ) {
        Long animalId = studentScoreDetail.getAnimalId();
        BigDecimal rawXp = studentScoreDetail.getRawXp();
        BigDecimal flatBonus = studentScoreDetail.getFlatBonus();
        BigDecimal percentageBonus = bonusXpCalculator.percentsToPercentageBonusXp(
                rawXp.add(flatBonus),
                studentScoreDetail.getPercentageBonus()
        );
        BigDecimal total = rawXp.add(flatBonus).add(percentageBonus);

        return PointsSummaryResponseDto.builder()
                .gained(toPointsSummaryDetailsWithoutItems(rawXp, GAINED))
                .flatBonus(toPointsSummaryDetailsWithItems(animalId, flatBonus, FLAT_BONUS, flatBonusItems))
                .percentageBonus(toPointsSummaryDetailsWithItems(animalId, percentageBonus, PERCENTAGE_BONUS, percentageBonusItems))
                .total(toPointsSummaryDetailsWithoutItems(total, TOTAL))
                .build();
    }

    private PointsSummaryDetailsResponseDto toPointsSummaryDetailsWithoutItems(BigDecimal points, String title) {
        return PointsSummaryDetailsResponseDto.builder()
                .gainedXp(points)
                .title(title)
                .build();
    }

    private PointsSummaryDetailsResponseDto toPointsSummaryDetailsWithItems(Long animalId, BigDecimal points, String title, List<AssignedItem> assignedItems) {
        List<AssignedRewardResponseDto> items = assignedItems.stream()
                .map(assignedItem -> assignedRewardMapper.itemToAssignedRewardDtoWithType(assignedItem, animalId))
                .sorted(Comparator.comparing(item -> item.base().getOrderIndex()))
                .toList();

        return PointsSummaryDetailsResponseDto.builder()
                .gainedXp(points)
                .title(title)
                .assignedItems(items)
                .build();
    }
}
