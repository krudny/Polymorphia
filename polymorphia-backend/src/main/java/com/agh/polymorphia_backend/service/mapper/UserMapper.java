package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.response.user_context.BaseUserDetailsResponseDto;
import com.agh.polymorphia_backend.dto.response.user_context.StudentDetailsResponseDto;
import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.hall_of_fame.HallOfFameEntry;
import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.model.user.UserType;
import com.agh.polymorphia_backend.service.hall_of_fame.HallOfFameService;
import com.agh.polymorphia_backend.service.student.AnimalService;
import com.agh.polymorphia_backend.service.user.UserService;
import lombok.AllArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@AllArgsConstructor
public class UserMapper {

    private final HallOfFameService hallOfFameService;
    private final UserService userService;
    private final AnimalService animalService;

    public BaseUserDetailsResponseDto toBaseUserDetailsResponseDto(User user, UserType userType) {
        Course course = user.getPreferredCourse();
        Hibernate.initialize(course);

        return BaseUserDetailsResponseDto.builder()
                .id(user.getId())
                .fullName(userService.getFullName(user))
                .courseId(course.getId())
                .imageUrl(getNonStudentImageUrl(userType, course))
                .build();
    }

    public BaseUserDetailsResponseDto toStudentDetailsResponseDto(User student, Course course) {
        Animal animal = animalService.getAnimal(student.getId(), course.getId());
        HallOfFameEntry hallOfFame = hallOfFameService.getStudentHallOfFame(animal);

        return StudentDetailsResponseDto.builder()
                .id(student.getId())
                .animalName(hallOfFame.getAnimalName())
                .evolutionStage(hallOfFame.getEvolutionStage())
                .position(hallOfFame.getPosition())
                .group(hallOfFame.getGroupName())
                .courseId(hallOfFame.getCourseId())
                .imageUrl(hallOfFame.getImageUrl())
                .fullName(hallOfFame.getStudentName())
                .build();
    }

    private String getNonStudentImageUrl(UserType userType, Course course) {
        return switch (userType) {
            case COORDINATOR -> course.getCoordinatorImageUrl();
            case INSTRUCTOR -> course.getInstructorImageUrl();
            default ->
                    throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Błąd pobrania obrazu użytkownika");
        };
    }
}
