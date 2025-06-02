package com.agh.polymorphia_backend.service.mapper.gradable;

import com.agh.polymorphia_backend.dto.response.event.section.GradableEventResponseDto;
import com.agh.polymorphia_backend.dto.response.event.section.GradableEventShortResponseDto;
import com.agh.polymorphia_backend.exception.database.InvalidArgumentException;
import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.model.event.gradable.GradableEvent;
import com.agh.polymorphia_backend.model.event.gradable.ProjectCriterion;
import com.agh.polymorphia_backend.service.GradeService;
import org.springframework.stereotype.Service;

import static com.agh.polymorphia_backend.service.DbExtractingUtil.DB_OBJECT_NOT_FOUND;
import static com.agh.polymorphia_backend.service.DbExtractingUtil.FIELD_GRADABLE_EVENT;

@Service
public class ProjectMapper extends GradableEventMapper {
    public ProjectMapper(GradeService gradeService) {
        super(gradeService);
    }

    @Override
    public GradableEventResponseDto toGradableEventResponseDto(GradableEvent<?> eventSection, Animal animal) {
        ProjectCriterion projectCriterion = getProjectCriterion(eventSection);
        GradableEventResponseDto event = GradableEventResponseDto.builder()
                .id(projectCriterion.getId())
                .name(projectCriterion.getName())
                .maxXp(projectCriterion.getMaxXp())
                .build();

        return setGradeAndRewards(event, projectCriterion, animal);
    }

    @Override
    public GradableEventShortResponseDto toShortResponseDto(GradableEvent<?> gradableEvent, Animal animal) {
        return null;
    }

    private ProjectCriterion getProjectCriterion(GradableEvent<?> gradableEvent) {
        try {
            return (ProjectCriterion) gradableEvent;
        } catch (ClassCastException e) {
            throw new InvalidArgumentException(String.format(
                    DB_OBJECT_NOT_FOUND,
                    FIELD_GRADABLE_EVENT,
                    gradableEvent.getId()
            ));
        }
    }
}
