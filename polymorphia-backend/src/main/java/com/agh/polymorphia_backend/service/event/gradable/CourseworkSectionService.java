package com.agh.polymorphia_backend.service.event.gradable;

import com.agh.polymorphia_backend.dto.response.event.section.EventSectionResponseDto;
import com.agh.polymorphia_backend.model.event.section.CourseworkSection;
import com.agh.polymorphia_backend.service.GradeService;
import com.agh.polymorphia_backend.service.course.AnimalService;
import com.agh.polymorphia_backend.service.mapper.gradable.CourseworkMapper;
import org.springframework.stereotype.Service;

@Service
public class CourseworkSectionService extends EventSectionService<CourseworkMapper> {


    public CourseworkSectionService(CourseworkMapper mapper, AnimalService animalService, com.agh.polymorphia_backend.service.event.section.EventSectionService eventSectionService, XpCalculator xpCalculator, GradeService gradeService) {
        super(mapper, animalService, eventSectionService, xpCalculator, gradeService);
    }

    @Override
    public EventSectionResponseDto getAllEvents(Long courseworkSectionId) {
        return getAllGradableEvents(
                new EventSectionResponseDto(),
                courseworkSectionId,
                CourseworkSection.class,
                CourseworkSection::getCourseworks,
                mapper::courseworkToGradableEventResponseDto
        );
    }
}
