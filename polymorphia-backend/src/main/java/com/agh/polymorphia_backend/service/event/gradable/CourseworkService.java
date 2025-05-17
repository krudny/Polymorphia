package com.agh.polymorphia_backend.service.event.gradable;

import com.agh.polymorphia_backend.dto.response.event.section.AllGradableEventsResponseDto;
import com.agh.polymorphia_backend.model.event.section.CourseworkSection;
import com.agh.polymorphia_backend.service.course.AnimalService;
import com.agh.polymorphia_backend.service.GradeService;
import com.agh.polymorphia_backend.service.event.section.EventSectionService;
import com.agh.polymorphia_backend.service.mapper.gradable.CourseworkMapper;
import org.springframework.stereotype.Service;

@Service
public class CourseworkService extends GradableEventService<CourseworkMapper> {


    public CourseworkService(CourseworkMapper mapper, AnimalService animalService, EventSectionService eventSectionService, XpCalculator xpCalculator, GradeService gradeService) {
        super(mapper, animalService, eventSectionService, xpCalculator, gradeService);
    }

    @Override
    public AllGradableEventsResponseDto getAllEvents(Long courseworkSectionId) {
        return getAllGradableEvents(
                new AllGradableEventsResponseDto(),
                courseworkSectionId,
                CourseworkSection.class,
                CourseworkSection::getCourseworks,
                mapper::courseworkToGradableEventResponseDto
        );
    }
}
