package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.response.hall_of_fame.HallOfFameRecordDto;
import com.agh.polymorphia_backend.dto.response.user.StudentDetailsResponseDto;
import com.agh.polymorphia_backend.model.hall_of_fame.HallOfFame;
import com.agh.polymorphia_backend.model.hall_of_fame.OverviewField;
import com.agh.polymorphia_backend.util.NumberFormatter;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@AllArgsConstructor
public class HallOfFameMapper {
    private final StudentDetailsMapper studentDetailsMapper;

    public HallOfFameRecordDto hallOfFameToRecordDto(HallOfFame hallOfFame, Map<String, String> xpDetails) {
        StudentDetailsResponseDto userDetails = studentDetailsMapper.hallOfFameToStudentDetailsResponseDto(hallOfFame);
        updateXpDetails(xpDetails, hallOfFame);

        return HallOfFameRecordDto.builder()
                .userDetails(userDetails)
                .xpDetails(xpDetails)
                .build();
    }

    private void updateXpDetails(Map<String, String> xpDetails, HallOfFame hallOfFame) {
        xpDetails.computeIfAbsent(OverviewField.BONUS.getKey(),
                k -> NumberFormatter.format(hallOfFame.getTotalBonusSum()));
        xpDetails.computeIfAbsent(OverviewField.TOTAL.getKey(),
                k -> NumberFormatter.format(hallOfFame.getTotalXpSum()));
    }
}
