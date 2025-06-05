package com.agh.polymorphia_backend.service.event.gradable;

import com.agh.polymorphia_backend.dto.response.event.section.bonus.BonusItemDto;
import com.agh.polymorphia_backend.dto.response.event.section.bonus.FlatBonusItemDto;
import com.agh.polymorphia_backend.dto.response.event.section.bonus.PercentageBonusItemDto;
import com.agh.polymorphia_backend.model.course.reward.item.FlatBonusItem;
import com.agh.polymorphia_backend.model.course.reward.item.Item;
import com.agh.polymorphia_backend.model.course.reward.item.PercentageBonusItem;
import com.agh.polymorphia_backend.model.grade.Grade;
import com.agh.polymorphia_backend.model.grade.reward.AssignedItem;
import lombok.AllArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Objects;
import java.util.function.Function;

@Service
@AllArgsConstructor
public class XpCalculator {
    public BigDecimal sumFlatBonus(List<AssignedItem> assignedItems) {
        return assignedItems.stream()
                .map(assignedItem -> (Item) Hibernate.unproxy(assignedItem.getItem()))
                .filter(item -> item instanceof FlatBonusItem)
                .map(item -> ((FlatBonusItem) item).getXpBonus())
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public BigDecimal sumGainedXp(List<Grade> grades) {
        return grades.stream()
                .map(Grade::getXp)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public int sumPercentageBonus(List<AssignedItem> assignedItems) {
        return assignedItems.stream()
                .map(assignedItem -> (Item) Hibernate.unproxy(assignedItem.getItem()))
                .filter(item -> item instanceof PercentageBonusItem)
                .mapToInt(item -> ((PercentageBonusItem) item).getPercentageBonus())
                .sum();
    }

    public List<BonusItemDto> getPercentageBonusItemDtos(List<AssignedItem> assignedItems, BigDecimal gainedXp) {
        return getBonusItemDtos(assignedItems, assignedItem -> getPercentageBonusItemDto(assignedItem, gainedXp));
    }

    public List<BonusItemDto> getFlatBonusItemDtos(List<AssignedItem> assignedItems) {
        return getBonusItemDtos(assignedItems, this::getFlatBonusItemDto);
    }

    public List<BonusItemDto> getBonusItemDtos(List<AssignedItem> assignedItems, Function<AssignedItem, BonusItemDto> bonusItemFetcher) {
        return assignedItems.stream()
                .map(bonusItemFetcher)
                .filter(Objects::nonNull)
                .toList();
    }

    private BonusItemDto getPercentageBonusItemDto(AssignedItem assignedItem, BigDecimal gainedXp) {
        Item item = (Item) Hibernate.unproxy(assignedItem.getItem());
        if (!(item instanceof PercentageBonusItem bonusItem)) return null;

        BigDecimal bonusXp = gainedXp
                .multiply(BigDecimal.valueOf(bonusItem.getPercentageBonus()))
                .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP)
                .setScale(1, RoundingMode.HALF_UP);

        PercentageBonusItemDto bonusItemDto = PercentageBonusItemDto.builder()
                .xp(bonusXp)
                .percentage(bonusItem.getPercentageBonus())
                .build();

        setBonusItemCommonProperties(bonusItemDto, bonusItem, assignedItem);
        return bonusItemDto;
    }

    private BonusItemDto getFlatBonusItemDto(AssignedItem assignedItem) {
        Item item = (Item) Hibernate.unproxy(assignedItem.getItem());
        if (!(item instanceof FlatBonusItem bonusItem)) return null;
        FlatBonusItemDto bonusItemDto = FlatBonusItemDto.builder()
                .xp(bonusItem.getXpBonus())
                .build();
        setBonusItemCommonProperties(bonusItemDto, bonusItem, assignedItem);
        return bonusItemDto;
    }

    private void setBonusItemCommonProperties(BonusItemDto bonusItemDto, Item bonusItem, AssignedItem assignedItem) {
        bonusItemDto.setId(bonusItem.getId());
        bonusItemDto.setAssignedItemId(assignedItem.getId());
        bonusItemDto.setAssignedChestId(assignedItem.getAssignedChest().getId());
        bonusItemDto.setName(bonusItem.getName());
        bonusItemDto.setImageUrl(bonusItem.getImageUrl());
        bonusItemDto.setReceivedDate(assignedItem.getAssignedChest().getReceivedDate());
    }

}
