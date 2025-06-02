package com.agh.polymorphia_backend.service.event.gradable;

import com.agh.polymorphia_backend.model.course.reward.item.FlatBonusItem;
import com.agh.polymorphia_backend.model.course.reward.item.Item;
import com.agh.polymorphia_backend.model.course.reward.item.PercentageBonusItem;
import com.agh.polymorphia_backend.model.grade.Grade;
import com.agh.polymorphia_backend.model.grade.reward.AssignedItem;
import lombok.AllArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class XpCalculator {


    public float sumFlatBonus(List<AssignedItem> assignedItems) {
        return (float) assignedItems.stream()
                .map(assignedItem -> (Item) Hibernate.unproxy(assignedItem.getItem()))
                .filter(item -> item instanceof FlatBonusItem)
                .mapToDouble(item -> ((FlatBonusItem) item).getXpBonus())
                .sum();
    }

    public float sumGainedXp(List<Grade> grades) {
        return grades.stream()
                .map(Grade::getXp)
                .reduce((float) 0, Float::sum);
    }

    public int sumPercentageBonus(List<AssignedItem> assignedItems) {
        return assignedItems.stream()
                .map(assignedItem -> (Item) Hibernate.unproxy(assignedItem.getItem()))
                .filter(item -> item instanceof PercentageBonusItem)
                .mapToInt(item -> ((PercentageBonusItem) item).getPercentageBonus())
                .sum();
    }

}
