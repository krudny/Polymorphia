package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.response.hall_of_fame.HallOfFameRecordDto;
import com.agh.polymorphia_backend.dto.response.user.StudentDetailsResponseDto;
import com.agh.polymorphia_backend.model.HallOfFame;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

import static com.agh.polymorphia_backend.service.HallOfFameService.formatNumber;

@Service
@AllArgsConstructor
public class HallOfFameMapper {
    public HallOfFameRecordDto hallOfFameToRecordDto(HallOfFame hallOfFame, Map<String, String> scoreDetailsList, boolean includeStudentName) {
        StudentDetailsResponseDto userDetails = StudentDetailsResponseDto.builder()
                .studentName(includeStudentName ? hallOfFame.getStudentName() : null)
                .animalName(hallOfFame.getAnimalName())
                .evolutionStage(hallOfFame.getEvolutionStage())
                .group(hallOfFame.getGroupName())
                .imageUrl(hallOfFame.getImageUrl())
                .position(hallOfFame.getPosition())
                .build();

        if (!scoreDetailsList.containsKey("bonus")){
            scoreDetailsList.put("bonus", formatNumber(hallOfFame.getFlatBonusSum().add(hallOfFame.getPercentageBonusSum())));
        }

        if (!scoreDetailsList.containsKey("total")) {
            scoreDetailsList.put("total", formatNumber(hallOfFame.getTotalXpSum()));
        }

        return HallOfFameRecordDto.builder()
                .userDetails(userDetails)
                .xpDetails(scoreDetailsList)
                .build();
    }
}
