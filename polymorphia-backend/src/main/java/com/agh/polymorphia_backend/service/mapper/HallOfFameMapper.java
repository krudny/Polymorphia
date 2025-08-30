package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.response.hall_of_fame.HallOfFameRecordDto;
import com.agh.polymorphia_backend.dto.response.user.StudentDetailsResponseDto;
import com.agh.polymorphia_backend.dto.response.user.StudentDetailsWithNameResponseDto;
import com.agh.polymorphia_backend.dto.response.user.StudentDetailsWithoutNameResponseDto;
import com.agh.polymorphia_backend.model.hall_of_fame.HallOfFame;
import com.agh.polymorphia_backend.model.hall_of_fame.OverviewField;
import com.agh.polymorphia_backend.model.user.UserType;
import com.agh.polymorphia_backend.service.validation.AccessAuthorizer;
import com.agh.polymorphia_backend.util.NumberFormatter;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class HallOfFameMapper {
    private final AccessAuthorizer accessAuthorizer;

    public HallOfFameRecordDto hallOfFameToRecordDto(HallOfFame hallOfFame, Map<String, String> xpDetails) {
        StudentDetailsWithoutNameResponseDto studentDetailsWithoutName = new StudentDetailsWithoutNameResponseDto(
                hallOfFame.getAnimalName(),
                hallOfFame.getEvolutionStage(),
                hallOfFame.getGroupName(),
                hallOfFame.getImageUrl(),
                hallOfFame.getPosition()
        );

        boolean includeStudentName = accessAuthorizer.hasAnyRole(List.of(UserType.COORDINATOR, UserType.INSTRUCTOR));
        StudentDetailsResponseDto userDetails = includeStudentName ?
                new StudentDetailsWithNameResponseDto(hallOfFame.getStudentName(), studentDetailsWithoutName)
                : studentDetailsWithoutName;

        if (!xpDetails.containsKey(OverviewField.BONUS.getKey())) {
            xpDetails.put(OverviewField.BONUS.getKey(), NumberFormatter.format(hallOfFame.getTotalBonusSum()));
        }

        if (!xpDetails.containsKey(OverviewField.TOTAL.getKey())) {
            xpDetails.put(OverviewField.TOTAL.getKey(), NumberFormatter.format(hallOfFame.getTotalXpSum()));
        }

        return HallOfFameRecordDto.builder()
                .userDetails(userDetails)
                .xpDetails(xpDetails)
                .build();
    }
}
