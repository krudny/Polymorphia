package com.agh.polymorphia_backend.service.project;

import com.agh.polymorphia_backend.dto.response.project.ProjectVariantResponseDto;
import com.agh.polymorphia_backend.dto.response.user_context.BaseUserDetailsResponseDto;
import com.agh.polymorphia_backend.dto.response.user_context.UserDetailsResponseDto;
import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.project.Project;
import com.agh.polymorphia_backend.model.project.ProjectGroup;
import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.model.user.UserType;
import com.agh.polymorphia_backend.repository.project.ProjectRepository;
import com.agh.polymorphia_backend.service.mapper.ProjectMapper;
import com.agh.polymorphia_backend.service.mapper.UserMapper;
import com.agh.polymorphia_backend.service.student.AnimalService;
import com.agh.polymorphia_backend.service.validation.AccessAuthorizer;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@AllArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final AccessAuthorizer accessAuthorizer;
    private final AnimalService animalService;
    private final ProjectMapper projectMapper;
    private final UserMapper userMapper;

    public List<ProjectVariantResponseDto> getProjectVariants(Long userId, Long projectId) {
        Project project = getProjectGradableEvent(projectId);
        Course course = project.getEventSection().getCourse();
        Animal animal = animalService.getAnimal(userId, course.getId());
        ProjectGroup projectGroup = extractProjectGroup(project, animal);

        accessAuthorizer.authorizeCourseAccess(course);
        accessAuthorizer.authorizeProjectGroupDetailsAccess(projectGroup);

        return projectGroup.getProjectVariants().stream()
                .map(projectMapper::toProjectVariantResponseDto)
                .toList();

    }

    public List<UserDetailsResponseDto> getProjectGroup(Long projectGroupId, Long projectId) {
        Project project = getProjectGradableEvent(projectId);
        Course course = project.getEventSection().getCourse();

        ProjectGroup projectGroup = project.getProjectGroups()
                .stream()
                .filter(group -> group.getId().equals(projectGroupId))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Nie znaleziono grupy projektowej."));

        accessAuthorizer.authorizeCourseAccess(course);
        accessAuthorizer.authorizeProjectGroupDetailsAccess(projectGroup);

        return projectGroup.getAnimals().stream()
                .map(a -> getUserDetailsResponseDto(a, course))
                .toList();
    }

    public List<UserDetailsResponseDto> getAnimalProjectGroup(Long userId, Long projectId) {
        Project project = getProjectGradableEvent(projectId);
        Course course = project.getEventSection().getCourse();
        Animal animal = animalService.getAnimal(userId, course.getId());
        ProjectGroup projectGroup = extractProjectGroup(project, animal);

        accessAuthorizer.authorizeProjectGroupDetailsAccess(projectGroup);

        return extractProjectGroup(project, animal)
                .getAnimals().stream()
                .map(a -> getUserDetailsResponseDto(a, course))
                .toList();
    }

    private ProjectGroup extractProjectGroup(Project project, Animal animal) {
        return project.getProjectGroups().stream()
                .filter(pg -> pg.getAnimals().contains(animal))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Zwierzak nie jest przypisany do żadnej grupy projektowej."
                ));
    }

    private UserDetailsResponseDto getUserDetailsResponseDto(Animal animal, Course course) {
        User user = animal.getStudentCourseGroupAssignment().getStudent().getUser();
        BaseUserDetailsResponseDto userDetails = userMapper.toStudentDetailsResponseDto(user, course);

        return UserDetailsResponseDto.builder()
                .userRole(UserType.STUDENT)
                .userDetails(userDetails)
                .build();
    }

    public Project getProjectGradableEvent(Long projectId) {
        return projectRepository.findById(projectId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Projekt nie został znaleziony."));
    }
}
