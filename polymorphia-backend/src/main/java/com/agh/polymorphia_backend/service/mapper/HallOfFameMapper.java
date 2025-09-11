package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.model.hall_of_fame.HallOfFame;
import com.agh.polymorphia_backend.model.hall_of_fame.OverviewField;
import com.agh.polymorphia_backend.util.NumberFormatter;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@AllArgsConstructor
public class HallOfFameMapper {
    public void updateXpDetails(Map<String, String> xpDetails, HallOfFame hallOfFame) {
        xpDetails.computeIfAbsent(OverviewField.BONUS.getKey(),
                k -> NumberFormatter.formatToString(hallOfFame.getTotalBonusSum()));
        xpDetails.computeIfAbsent(OverviewField.TOTAL.getKey(),
                k -> NumberFormatter.formatToString(hallOfFame.getTotalXpSum()));
    }
}
