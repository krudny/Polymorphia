package com.agh.polymorphia_backend.service.event.gradable;

import com.agh.polymorphia_backend.dto.response.event.section.EventSectionResponseDto;
import com.agh.polymorphia_backend.dto.response.event.section.project.AnimalResponseDto;
import com.agh.polymorphia_backend.dto.response.event.section.project.ProjectResponseDto;
import com.agh.polymorphia_backend.dto.response.event.section.project.ProjectSubmissionResponseDto;
import com.agh.polymorphia_backend.dto.response.event.section.project.ProjectVariantResponseDto;
import com.agh.polymorphia_backend.exception.database.InvalidArgumentException;
import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.model.event.section.ProjectSection;
import com.agh.polymorphia_backend.model.event.submission.ProjectSubmission;
import com.agh.polymorphia_backend.model.project.ProjectGroup;
import com.agh.polymorphia_backend.repository.event.submission.SubmissionRepository;
import com.agh.polymorphia_backend.repository.project.ProjectGroupRepository;
import com.agh.polymorphia_backend.service.GradeService;
import com.agh.polymorphia_backend.service.course.AnimalService;
import com.agh.polymorphia_backend.service.mapper.gradable.ProjectMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectSectionService extends EventSectionService<ProjectMapper> {
    private static final String NO_PROJECT_GROUP_FOUND = "Animal is not assigned to any project group";


    private final ProjectGroupRepository projectGroupRepository;
    private final SubmissionRepository submissionRepository;

    public ProjectSectionService(ProjectMapper mapper, AnimalService animalService, com.agh.polymorphia_backend.service.event.section.EventSectionService eventSectionService, XpCalculator xpCalculator, GradeService gradeService, ProjectGroupRepository projectGroupRepository, SubmissionRepository submissionRepository) {
        super(mapper, animalService, eventSectionService, xpCalculator, gradeService);
        this.projectGroupRepository = projectGroupRepository;
        this.submissionRepository = submissionRepository;
    }


    @Override
    public EventSectionResponseDto getAllEvents(Long projectSectionId) {

        ProjectResponseDto responseDto = (ProjectResponseDto) getAllGradableEvents(
                new ProjectResponseDto(),
                projectSectionId,
                ProjectSection.class,
                ProjectSection::getProjectCriteria,
                mapper::projectToGradableEventResponseDto
        );

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
        if (projectSubmissionOptional.isEmpty()) {
            responseDto.setSubmitted(false);
        } else {
            responseDto.setSubmitted(true);

            ProjectSubmission projectSubmission = projectSubmissionOptional.get();
            ProjectSubmissionResponseDto submission = ProjectSubmissionResponseDto.builder()
                    .createdDate(projectSubmission.getCreatedDate())
                    .modifiedDate(projectSubmission.getModifiedDate())
                    .projectUrl(projectSubmission.getProjectUrl())
                    .build();

            responseDto.setSubmission(submission);
        }
    }

    private ProjectGroup getProjectGroup(Long projectSectionId) {
        ProjectSection section = eventSectionService.getEventSection(projectSectionId, ProjectSection.class);
        Animal animal = animalService.getAnimal(section);
        return projectGroupRepository.findByAnimalIdAndProjectSectionId(animal, projectSectionId)
                .orElseThrow(() -> new InvalidArgumentException(NO_PROJECT_GROUP_FOUND));
    }
}
