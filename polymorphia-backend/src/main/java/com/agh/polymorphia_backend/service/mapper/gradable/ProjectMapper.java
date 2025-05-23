package com.agh.polymorphia_backend.service.mapper.gradable;

import com.agh.polymorphia_backend.dto.response.event.section.GradableEventResponseDto;
import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.model.event.gradable.ProjectCriterion;
import com.agh.polymorphia_backend.service.GradeService;
import org.springframework.stereotype.Service;

@Service
public class ProjectMapper extends GradableEventMapper {
    public ProjectMapper(GradeService gradeService) {
        super(gradeService);
    }

    public GradableEventResponseDto projectToGradableEventResponseDto(ProjectCriterion projectCriterion, Animal animal) {
        GradableEventResponseDto event = new GradableEventResponseDto();

        event.setId(projectCriterion.getId());
        event.setName(projectCriterion.getName());

        event.setMaxXp(projectCriterion.getMaxXp());
        return setGradeAndRewards(event, projectCriterion, animal);
    }
}
