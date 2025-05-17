package com.agh.polymorphia_backend.service.event.gradable;

import com.agh.polymorphia_backend.dto.response.event.section.AllGradableEventsResponseDto;
import com.agh.polymorphia_backend.model.event.section.TestSection;
import com.agh.polymorphia_backend.service.course.AnimalService;
import com.agh.polymorphia_backend.service.GradeService;
import com.agh.polymorphia_backend.service.event.section.EventSectionService;
import com.agh.polymorphia_backend.service.mapper.gradable.TestMapper;
import org.springframework.stereotype.Service;

@Service
public class TestService extends GradableEventService<TestMapper> {


    public TestService(TestMapper mapper, AnimalService animalService, EventSectionService eventSectionService, XpCalculator xpCalculator, GradeService gradeService) {
        super(mapper, animalService, eventSectionService, xpCalculator, gradeService);
    }

    @Override
    public AllGradableEventsResponseDto getAllEvents(Long testSectionId) {
        return getAllGradableEvents(
                new AllGradableEventsResponseDto(),
                testSectionId,
                TestSection.class,
                TestSection::getTests,
                mapper::testToGradableEventResponseDto
        );
    }
}
