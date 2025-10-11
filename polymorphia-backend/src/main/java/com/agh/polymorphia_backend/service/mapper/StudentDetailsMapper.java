package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.response.user.StudentDetailsResponseDto;
import com.agh.polymorphia_backend.dto.response.user.StudentDetailsWithNameResponseDto;
import com.agh.polymorphia_backend.dto.response.user.StudentDetailsWithoutNameResponseDto;
import com.agh.polymorphia_backend.model.hall_of_fame.HallOfFameEntry;
import com.agh.polymorphia_backend.model.user.UserType;
import com.agh.polymorphia_backend.service.validation.AccessAuthorizer;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class StudentDetailsMapper {
    private final AccessAuthorizer accessAuthorizer;

    public StudentDetailsResponseDto hallOfFameToStudentDetailsResponseDto(HallOfFameEntry hallOfFameEntry) {
        StudentDetailsWithoutNameResponseDto studentDetailsWithoutName = new StudentDetailsWithoutNameResponseDto(
                hallOfFameEntry.getAnimalName(),
                hallOfFameEntry.getEvolutionStage(),
                hallOfFameEntry.getGroupName(),
                hallOfFameEntry.getImageUrl(),
                hallOfFameEntry.getPosition()
        );

        return accessAuthorizer.hasAnyRole(List.of(UserType.COORDINATOR, UserType.INSTRUCTOR)) ?
                new StudentDetailsWithNameResponseDto(hallOfFameEntry.getStudentName(), studentDetailsWithoutName)
                : studentDetailsWithoutName;
    }
}
