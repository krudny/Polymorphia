package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.response.user_context.AvailableCoursesResponseDto;
import com.agh.polymorphia_backend.dto.response.user_context.BaseUserDetailsResponseDto;
import com.agh.polymorphia_backend.dto.response.user_context.StudentDetailsResponseDto;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.hall_of_fame.HallOfFameEntry;
import com.agh.polymorphia_backend.model.user.AbstractRoleUser;
import com.agh.polymorphia_backend.model.user.Coordinator;
import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.model.user.UserType;
import com.agh.polymorphia_backend.service.hall_of_fame.HallOfFameService;
import com.agh.polymorphia_backend.service.user.UserService;
import lombok.AllArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@AllArgsConstructor
public class UserContextMapper {
    private final UserService userService;
    private final HallOfFameService hallOfFameService;

    public AvailableCoursesResponseDto toAvailableCoursesResponseDto(Course course, UserType role) {
        Coordinator coordinator = course.getCoordinator();
        User user = coordinator.getUser();
        return AvailableCoursesResponseDto.builder()
                .id(course.getId())
                .coordinatorName(String.join(" ", user.getFirstName(), user.getLastName()))
                .name(course.getName())
                .imageUrl(course.getImageUrl())
                .userRole(role)
                .build();
    }

    public BaseUserDetailsResponseDto toBaseUserDetailsResponseDto(AbstractRoleUser roleUser) {
        UserType userType = userService.getUserRole(roleUser);
        User user = roleUser.getUser();

        if (userType.equals(UserType.STUDENT)) {
            return toStudentDetailsResponseDto(user);
        }
        Course course = user.getPreferredCourse();
        Hibernate.initialize(course);

        return BaseUserDetailsResponseDto.builder()
                .id(user.getId())
                .fullName(userService.getFullName(user))
                .courseId(course.getId())
                .imageUrl(getNonStudentImageUrl(userType, course))
                .build();
    }

    private String getNonStudentImageUrl(UserType userType, Course course) {
        return switch (userType) {
            case COORDINATOR -> course.getCoordinatorImageUrl();
            case INSTRUCTOR -> course.getInstructorImageUrl();
            default -> throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        };
    }

    private BaseUserDetailsResponseDto toStudentDetailsResponseDto(User student) {
        HallOfFameEntry hallOfFame = hallOfFameService.getStudentHallOfFame(student);

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
}
