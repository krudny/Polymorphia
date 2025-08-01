package com.agh.polymorphia_backend.service.grade;

import com.agh.polymorphia_backend.dto.response.course.reward.item.assigned.AssignedItemResponseDto;
import com.agh.polymorphia_backend.dto.response.course.reward.item.assigned.ItemAssignmentDetailsResponseDto;
import com.agh.polymorphia_backend.dto.response.course.reward.item.base.BaseItemResponseDto;
import com.agh.polymorphia_backend.model.course.reward.item.FlatBonusItem;
import com.agh.polymorphia_backend.model.course.reward.item.Item;
import com.agh.polymorphia_backend.model.course.reward.item.ItemType;
import com.agh.polymorphia_backend.model.course.reward.item.PercentageBonusItem;
import com.agh.polymorphia_backend.model.grade.reward.AssignedItem;
import lombok.AllArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
@AllArgsConstructor
public class AssignedItemService {
    private static final String BONUS_TEXT_TEMPLATE = "+%s do kategorii %s";

    public AssignedItemResponseDto assignedItemToResponseDto(AssignedItem assignedItem, BigDecimal gainedXp) {
        return AssignedItemResponseDto.builder()
                .item(getBaseItem(assignedItem))
                .assignmentDetails(getItemAssignmentDetails(assignedItem, gainedXp))
                .build();
    }

    private BaseItemResponseDto getBaseItem(AssignedItem assignedItem) {
        Item item = (Item) Hibernate.unproxy(assignedItem.getItem());
        return BaseItemResponseDto.builder()
                .id(item.getId())
                .name(item.getName())
                .bonusText(getBonusText(item))
                .imageUrl(item.getImageUrl())
                .build();
    }

    private ItemAssignmentDetailsResponseDto getItemAssignmentDetails(AssignedItem assignedItem, BigDecimal gainedXp) {
        Item item = (Item) Hibernate.unproxy(assignedItem.getItem());
        return ItemAssignmentDetailsResponseDto.builder()
                .id(assignedItem.getId())
                .receivedDate(assignedItem.getAssignedChest().getReceivedDate())
                .xp(getBonusXp(item, gainedXp))
                .percentage(getBonusPercentage(item))
                .build();
    }

    private String getBonusText(Item item) {
        String eventSectionName = item.getEventSection().getName();
        String bonus = item.getItemType().equals(ItemType.FLAT_BONUS) ?
                ((FlatBonusItem) item).getXpBonus() + " xp"
                : ((PercentageBonusItem) item).getPercentageBonus() + "%";

        return String.format(BONUS_TEXT_TEMPLATE, bonus, eventSectionName);
    }

    private BigDecimal getBonusXp(Item item, BigDecimal gainedXp) {
        return item.getItemType().equals(ItemType.FLAT_BONUS) ? ((FlatBonusItem) item).getXpBonus()
                : BigDecimal.valueOf(((PercentageBonusItem) item).getPercentageBonus())
                .multiply(gainedXp)
                .divide(BigDecimal.valueOf(100), 1, RoundingMode.HALF_UP);
    }

    private Integer getBonusPercentage(Item item) {
        return item.getItemType().equals(ItemType.PERCENTAGE_BONUS) ?
                ((PercentageBonusItem) item).getPercentageBonus() : null;

    }
}
