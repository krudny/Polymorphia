package com.agh.polymorphia_backend.service.project;

import com.agh.polymorphia_backend.dto.request.project.ProjectGroupPickStudentsRequestDto;
import com.agh.polymorphia_backend.dto.request.target.StudentGroupTargetRequestDto;
import com.agh.polymorphia_backend.dto.request.target.StudentTargetRequestDto;
import com.agh.polymorphia_backend.dto.request.target.TargetRequestDto;
import com.agh.polymorphia_backend.dto.request.target.TargetType;
import com.agh.polymorphia_backend.dto.response.project.ProjectCategoryWithVariantsResponseDto;
import com.agh.polymorphia_backend.dto.response.project.ProjectGroupConfigurationResponseDto;
import com.agh.polymorphia_backend.dto.response.project.ProjectGroupPickStudentsResponseDto;
import com.agh.polymorphia_backend.dto.response.project.ProjectVariantResponseDto;
import com.agh.polymorphia_backend.dto.response.project.filter.FilterOptionResponseDto;
import com.agh.polymorphia_backend.dto.response.project.filter.ProjectGroupConfigurationFiltersResponseDto;
import com.agh.polymorphia_backend.dto.response.user_context.BaseUserDetailsResponseDto;
import com.agh.polymorphia_backend.dto.response.user_context.UserDetailsResponseDto;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.hall_of_fame.HallOfFameEntry;
import com.agh.polymorphia_backend.model.project.Project;
import com.agh.polymorphia_backend.model.project.ProjectGroup;
import com.agh.polymorphia_backend.model.project.ProjectVariant;
import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.model.user.UserType;
import com.agh.polymorphia_backend.model.user.student.Animal;
import com.agh.polymorphia_backend.repository.course.CourseGroupRepository;
import com.agh.polymorphia_backend.repository.project.ProjectRepository;
import com.agh.polymorphia_backend.service.hall_of_fame.HallOfFameService;
import com.agh.polymorphia_backend.service.mapper.ProjectMapper;
import com.agh.polymorphia_backend.service.mapper.UserMapper;
import com.agh.polymorphia_backend.service.student.AnimalService;
import com.agh.polymorphia_backend.service.user.UserService;
import com.agh.polymorphia_backend.service.validation.AccessAuthorizer;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final CourseGroupRepository courseGroupRepository;
    private final AccessAuthorizer accessAuthorizer;
    private final AnimalService animalService;
    private final HallOfFameService hallOfFameService;
    private final UserService userService;
    private final ProjectMapper projectMapper;
    private final UserMapper userMapper;
    private final ProjectGroupService projectGroupService;

    public List<ProjectVariantResponseDto> getProjectVariants(TargetRequestDto target, Long projectId) {
        Project project = getProjectGradableEvent(projectId);
        ProjectGroup projectGroup = getProjectGroupForTargetAndAuthorize(project, target);

        return projectGroup.getProjectVariants().stream()
                .map(projectMapper::toProjectVariantResponseDto)
                .toList();
    }

    public List<UserDetailsResponseDto> getProjectGroup(Long projectGroupId, Long projectId) {
        Course course = getProjectGradableEvent(projectId).getEventSection().getCourse();
        ProjectGroup projectGroup = projectGroupService.findById(projectGroupId);
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

        return projectGroup
                .getAnimals().stream()
                .map(a -> getUserDetailsResponseDto(a, course))
                .toList();
    }

    public ProjectGroupConfigurationResponseDto getProjectGroupConfiguration(TargetRequestDto targetRequestDto, Long projectId) {
        ProjectGroup projectGroup = getProjectGroupForTargetAndAuthorize(getProjectGradableEvent(projectId), targetRequestDto);

        List<Long> studentIds = projectGroup.getAnimals().stream()
                .map(animal -> animalService.getStudentIdForAnimalId(animal.getId()))
                .toList();

        Map<Long, Long> selectedVariants = projectGroup.getProjectVariants().stream()
                .collect(Collectors.toMap(
                        projectVariant -> projectVariant.getCategory().getId(),
                        ProjectVariant::getId
                ));

        return ProjectGroupConfigurationResponseDto.builder()
                .studentIds(studentIds)
                .selectedVariants(selectedVariants)
                .build();
    }

    public ProjectGroupConfigurationFiltersResponseDto getProjectGroupConfigurationFilters(Optional<TargetRequestDto> targetRequestDto, Long projectId) {
        Project project = getProjectGradableEvent(projectId);
        Course course = project.getEventSection().getCourse();
        Long userId = userService.getCurrentUser().getUser().getId();
        getProjectGroupForTargetAndAuthorize(project, course, targetRequestDto);

        List<FilterOptionResponseDto> options = courseGroupRepository
                .findShortCourseGroups(course.getId(), null, userId)
                .stream()
                .map(courseGroup -> FilterOptionResponseDto.builder()
                        .value(courseGroup.getName())
                        .build())
                .collect(Collectors.toList());

        long max;
        List<String> defaultValues;
        if (projectRepository.findAllowCrossCourseGroupProjectGroups(projectId)) {
            max = options.size();
            options.add(FilterOptionResponseDto.builder()
                    .value("all")
                    .label("Wszystkie")
                    .specialBehaviour("EXCLUSIVE")
                    .build());
            defaultValues = List.of("all");
        } else {
            max = 1L;
            defaultValues = List.of(options.getFirst().getValue());
        }

        return ProjectGroupConfigurationFiltersResponseDto.builder()
                .options(options)
                .defaultValues(defaultValues)
                .max(max)
                .build();
    }

    public List<ProjectGroupPickStudentsResponseDto> getProjectGroupConfigurationGroupPickStudents(ProjectGroupPickStudentsRequestDto requestDto, Long projectId) {
        boolean includeAllGroups = requestDto.getGroups().isEmpty() ||
                (requestDto.getGroups().size() == 1 && requestDto.getGroups().getFirst().equals("all"));

        Project project = getProjectGradableEvent(projectId);
        Course course = project.getEventSection().getCourse();
        Long userId = userService.getCurrentUser().getUser().getId();
        List<ProjectGroupPickStudentsResponseDto> students = projectRepository
                .getProjectGroupConfigurationGroupPickStudents(course.getId(), projectId, userId, requestDto.getGroups(), includeAllGroups);

        getProjectGroupForTargetAndAuthorize(project, course, Optional.ofNullable(requestDto.getTarget()))
                .ifPresent(projectGroup -> projectGroup.getAnimals().forEach(animal -> {
                    Long studentId = animalService.getStudentIdForAnimalId(animal.getId());
                    HallOfFameEntry hofe = hallOfFameService.getStudentHallOfFame(studentId, course.getId());
                    students.add(projectMapper.toProjectGroupPickStudentsResponseDto(hofe));
                }));
        return students;
    }

    public List<ProjectCategoryWithVariantsResponseDto> getProjectCategoryWithVariants(Long projectId) {
        accessAuthorizer.authorizeCourseAccess(getProjectGradableEvent(projectId).getEventSection().getCourse());

        return projectRepository.findCategoriesWithVariants(projectId)
                .stream()
                .map(projectMapper::toProjectCategoryResponseDto)
                .toList();
    }

    private ProjectGroup getProjectGroupForTargetAndAuthorize(Project project, TargetRequestDto target) {
        Long courseId = project.getEventSection().getCourse().getId();
        if (target.type().equals(TargetType.STUDENT)) {
            Animal animal = animalService.getAnimal(((StudentTargetRequestDto) target).id(), courseId);
            return extractProjectGroup(project, animal);
        }

        ProjectGroup projectGroup = projectGroupService.findById(((StudentGroupTargetRequestDto) target).groupId());
        accessAuthorizer.authorizeProjectGroupDetailsAccess(projectGroup);
        return projectGroup;
    }

    private Optional<ProjectGroup> getProjectGroupForTargetAndAuthorize(Project project, Course course, Optional<TargetRequestDto> target) {
        if (target.isPresent()) {
            return Optional.of(getProjectGroupForTargetAndAuthorize(project, target.get()));
        } else {
            accessAuthorizer.authorizeCourseAccess(course);
            return Optional.empty();
        }
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
