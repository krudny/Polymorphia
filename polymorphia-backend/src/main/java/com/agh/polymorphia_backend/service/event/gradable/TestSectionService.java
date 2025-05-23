package com.agh.polymorphia_backend.service.event.gradable;

import com.agh.polymorphia_backend.dto.response.event.section.EventSectionResponseDto;
import com.agh.polymorphia_backend.model.event.section.TestSection;
import com.agh.polymorphia_backend.service.GradeService;
import com.agh.polymorphia_backend.service.course.AnimalService;
import com.agh.polymorphia_backend.service.mapper.gradable.TestMapper;
import org.springframework.stereotype.Service;

@Service
public class TestSectionService extends EventSectionService<TestMapper> {


    public TestSectionService(TestMapper mapper, AnimalService animalService, com.agh.polymorphia_backend.service.event.section.EventSectionService eventSectionService, XpCalculator xpCalculator, GradeService gradeService) {
        super(mapper, animalService, eventSectionService, xpCalculator, gradeService);
    }

    @Override
    public EventSectionResponseDto getAllEvents(Long testSectionId) {
        return getAllGradableEvents(
                new EventSectionResponseDto(),
                testSectionId,
                TestSection.class,
                TestSection::getTests,
                mapper::testToGradableEventResponseDto
        );
    }
}
