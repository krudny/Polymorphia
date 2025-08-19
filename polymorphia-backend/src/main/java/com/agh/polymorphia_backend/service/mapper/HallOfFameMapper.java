package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.response.hall_of_fame.HallOfFameRecordDto;
import com.agh.polymorphia_backend.dto.response.user.StudentDetailsResponseDto;
import com.agh.polymorphia_backend.dto.response.user.StudentDetailsWithNameResponseDto;
import com.agh.polymorphia_backend.dto.response.user.StudentDetailsWithoutNameResponseDto;
import com.agh.polymorphia_backend.model.hall_of_fame.HallOfFame;
import com.agh.polymorphia_backend.model.user.UserType;
import com.agh.polymorphia_backend.service.AuthService;
import com.agh.polymorphia_backend.util.NumberFormatter;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class HallOfFameMapper {
    private final AuthService authService;

    public HallOfFameRecordDto hallOfFameToRecordDto(HallOfFame hallOfFame, Map<String, String> xpDetails) {
        StudentDetailsWithoutNameResponseDto studentDetailsWithoutName = StudentDetailsWithoutNameResponseDto.builder()
                .animalName(hallOfFame.getAnimalName())
                .evolutionStage(hallOfFame.getEvolutionStage())
                .group(hallOfFame.getGroupName())
                .imageUrl(hallOfFame.getImageUrl())
                .position(hallOfFame.getPosition())
                .build();

        boolean includeStudentName = authService.hasAnyRole(List.of(UserType.COORDINATOR, UserType.INSTRUCTOR));
        StudentDetailsResponseDto userDetails = includeStudentName ?
                new StudentDetailsWithNameResponseDto(hallOfFame.getStudentName(), studentDetailsWithoutName)
                : studentDetailsWithoutName;

        if (!xpDetails.containsKey("bonus")){
            xpDetails.put("bonus", NumberFormatter.format(hallOfFame.getTotalBonusSum()));
        }

        if (!xpDetails.containsKey("total")) {
            xpDetails.put("total", NumberFormatter.format(hallOfFame.getTotalXpSum()));
        }

        return HallOfFameRecordDto.builder()
                .userDetails(userDetails)
                .xpDetails(xpDetails)
                .build();
    }
}
