package com.agh.polymorphia_backend.service.event.gradable;

import com.agh.polymorphia_backend.dto.response.event.section.GradableEventResponseDto;
import com.agh.polymorphia_backend.dto.response.event.section.grade.GradeResponseDto;
import com.agh.polymorphia_backend.model.course.reward.item.Item;
import com.agh.polymorphia_backend.model.course.reward.item.PercentageBonusItem;
import com.agh.polymorphia_backend.model.grade.Grade;
import com.agh.polymorphia_backend.model.grade.reward.AssignedItem;
import com.agh.polymorphia_backend.model.grade.reward.BoostedGradableEvent;
import lombok.AllArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class XpCalculator {

    public Integer sumFlatBonusXp(Map<Long, GradableEventResponseDto> gradableEvents) {
        return gradableEvents.values().stream()
                .map(event -> Optional.ofNullable(event.getGrade())
                        .map(GradeResponseDto::getFlatBonusXp)
                        .orElse(0)
                )
                .reduce(0, Integer::sum);
    }

    public Integer sumGainedXp(List<Grade> grades) {
        return grades.stream()
                .map(Grade::getXp)
                .reduce(0, Integer::sum);
    }

    public int setGradableEventBonusXpAndReturnPercentageBonusSum(List<AssignedItem> assignedItems, Map<Long, GradableEventResponseDto> gradableEvents) {
        Integer percentageBonus = 0;

        for (AssignedItem assignedItem : assignedItems) {
            Item item = (Item) Hibernate.unproxy(assignedItem.getItem());
            if (item instanceof PercentageBonusItem) {
                percentageBonus += ((PercentageBonusItem) item).getPercentageBonus();
            } else {
                for (BoostedGradableEvent boostedGradableEvent : assignedItem.getBoostedGradableEvents()) {
                    GradableEventResponseDto event = gradableEvents.get(boostedGradableEvent.getGradableEvent().getId());
                    if (event != null) {
                        setEventSectionBonusXp(event.getGrade(), boostedGradableEvent.getFlatBonusXp());
                    }
                }
            }
        }
        return percentageBonus;
    }

    private void setEventSectionBonusXp(GradeResponseDto grade, int flatBonusXp) {
        int gainedXp = Optional.ofNullable(grade.getGainedXp()).orElse(0);
        int currentFlatBonusXp = Optional.ofNullable(grade.getFlatBonusXp()).orElse(0);

        grade.setFlatBonusXp(flatBonusXp + currentFlatBonusXp);
        grade.setTotalXp(grade.getFlatBonusXp() + gainedXp);
    }

}
