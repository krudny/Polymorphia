package com.agh.polymorphia_backend.service.event.gradable;

import com.agh.polymorphia_backend.dto.response.event.gradable.GradableEventResponseDto;
import com.agh.polymorphia_backend.dto.response.event.gradable.project.AnimalResponseDto;
import com.agh.polymorphia_backend.dto.response.event.gradable.project.ProjectResponseDto;
import com.agh.polymorphia_backend.dto.response.event.gradable.project.ProjectSubmissionResponseDto;
import com.agh.polymorphia_backend.dto.response.event.gradable.project.ProjectVariantResponseDto;
import com.agh.polymorphia_backend.dto.response.event.section.EventSectionResponseDto;
import com.agh.polymorphia_backend.exception.database.InvalidArgumentException;
import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.model.event.gradable.ProjectCriterion;
import com.agh.polymorphia_backend.model.event.section.ProjectSection;
import com.agh.polymorphia_backend.model.event.submission.ProjectSubmission;
import com.agh.polymorphia_backend.model.project.ProjectGroup;
import com.agh.polymorphia_backend.repository.event.gradable.GradableEventRepository;
import com.agh.polymorphia_backend.repository.event.section.EventSectionRepository;
import com.agh.polymorphia_backend.repository.event.submission.SubmissionRepository;
import com.agh.polymorphia_backend.repository.project.ProjectGroupRepository;
import com.agh.polymorphia_backend.service.GradeService;
import com.agh.polymorphia_backend.service.course.AnimalService;
import com.agh.polymorphia_backend.service.mapper.gradable.ProjectMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import static com.agh.polymorphia_backend.service.DbExtractingUtil.DB_OBJECT_NOT_FOUND;
import static com.agh.polymorphia_backend.service.DbExtractingUtil.FIELD_EVENT_SECTION;

@Service
public class ProjectSectionService extends EventSectionService {
    private static final String NO_PROJECT_GROUP_FOUND = "Animal is not assigned to any project group";


    private final ProjectGroupRepository projectGroupRepository;
    private final SubmissionRepository submissionRepository;

    public ProjectSectionService(ProjectMapper mapper,
                                 AnimalService animalService,
                                 EventSectionRepository eventSectionRepository,
                                 XpCalculator xpCalculator,
                                 GradeService gradeService,
                                 ProjectGroupRepository projectGroupRepository,
                                 SubmissionRepository submissionRepository,
                                 GradableEventRepository gradableEventRepository) {
        super(mapper, gradeService, animalService, eventSectionRepository, xpCalculator, gradableEventRepository);
        this.projectGroupRepository = projectGroupRepository;
        this.submissionRepository = submissionRepository;
    }


    @Override
    public EventSectionResponseDto getAllEvents(Long projectSectionId) {

        ProjectResponseDto responseDto = new ProjectResponseDto();

        addGradableEventsSummary(responseDto, projectSectionId);
        setProjectCriteria(responseDto, projectSectionId);

        ProjectGroup projectGroup = getProjectGroup(projectSectionId);
        setProjectAnimals(responseDto, projectGroup);
        setProjectVariants(responseDto, projectGroup);
        setProjectSubmission(responseDto, projectGroup);
        return responseDto;
    }

    private void setProjectAnimals(ProjectResponseDto responseDto, ProjectGroup projectGroup) {
        List<AnimalResponseDto> projectAnimals = projectGroup.getAnimals()
                .stream()
                .map(animal -> AnimalResponseDto.builder()
                        .name(animal.getName())
                        .id(animal.getId())
                        .build()
                )
                .toList();
        responseDto.setProjectAnimals(projectAnimals);
    }

    private void setProjectVariants(ProjectResponseDto responseDto, ProjectGroup projectGroup) {
        List<ProjectVariantResponseDto> projectVariants = projectGroup.getProjectVariants()
                .stream()
                .map(variant -> ProjectVariantResponseDto.builder()
                        .id(variant.getId())
                        .name(variant.getName())
                        .category(variant.getProjectVariantCategory().getName())
                        .description(variant.getDescription())
                        .build()
                )
                .toList();
        responseDto.setProjectVariants(projectVariants);
    }

    private void setProjectSubmission(ProjectResponseDto responseDto, ProjectGroup projectGroup) {
        Optional<ProjectSubmission> projectSubmissionOptional =
                submissionRepository.findProjectSubmissionByProjectGroupId(
                        projectGroup.getId()
                );
        if (projectSubmissionOptional.isPresent()) {
            ProjectSubmission projectSubmission = projectSubmissionOptional.get();
            ProjectSubmissionResponseDto submission = ProjectSubmissionResponseDto.builder()
                    .createdDate(projectSubmission.getCreatedDate())
                    .modifiedDate(projectSubmission.getModifiedDate())
                    .projectUrl(projectSubmission.getProjectUrl())
                    .build();

            responseDto.setSubmission(submission);
        }
    }

    private void setProjectCriteria(ProjectResponseDto responseDto, Long projectSectionId) {
        ProjectSection projectSection = getProjectSection(projectSectionId);

        Animal animal = animalService.getAnimal(projectSection);
        Set<ProjectCriterion> projectCriteriaSet = projectSection.getProjectCriteria();

        List<GradableEventResponseDto> gradableEvents = projectCriteriaSet.stream()
                .map(event -> mapper.toGradableEventResponseDto(event, animal))
                .toList();

        responseDto.setProjectCriteria(gradableEvents);
    }

    private ProjectGroup getProjectGroup(Long projectSectionId) {
        ProjectSection section = getProjectSection(projectSectionId);

        Animal animal = animalService.getAnimal(section);
        return projectGroupRepository.findByAnimalIdAndProjectSectionId(animal, projectSectionId)
                .orElseThrow(() -> new InvalidArgumentException(NO_PROJECT_GROUP_FOUND));
    }

    private ProjectSection getProjectSection(Long projectSectionId) {
        try {
            return (ProjectSection) getEventSection(projectSectionId);
        } catch (ClassCastException e) {
            throw new InvalidArgumentException(String.format(
                    DB_OBJECT_NOT_FOUND,
                    FIELD_EVENT_SECTION,
                    projectSectionId
            ));
        }
    }
}
