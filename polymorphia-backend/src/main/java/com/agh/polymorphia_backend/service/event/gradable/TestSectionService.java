package com.agh.polymorphia_backend.service.event.gradable;

import com.agh.polymorphia_backend.dto.response.event.section.EventSectionResponseDto;
import com.agh.polymorphia_backend.model.event.gradable.GradableEvent;
import com.agh.polymorphia_backend.repository.event.gradable.GradableEventRepository;
import com.agh.polymorphia_backend.repository.event.gradable.TestRepository;
import com.agh.polymorphia_backend.repository.event.section.EventSectionRepository;
import com.agh.polymorphia_backend.service.GradeService;
import com.agh.polymorphia_backend.service.course.AnimalService;
import com.agh.polymorphia_backend.service.mapper.gradable.TestMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class TestSectionService extends EventSectionService {

    private final TestRepository testRepository;

    public TestSectionService(TestMapper mapper,
                              AnimalService animalService,
                              EventSectionRepository eventSectionRepository,
                              XpCalculator xpCalculator,
                              GradeService gradeService,
                              GradableEventRepository gradableEventRepository, TestRepository testRepository) {
        super(mapper, gradeService, animalService, eventSectionRepository, xpCalculator, gradableEventRepository);
        this.testRepository = testRepository;
    }

    @Override
    public EventSectionResponseDto getAllEvents(Long testSectionId) {
        EventSectionResponseDto responseDto = new EventSectionResponseDto();

        addGradableEventsSummary(responseDto, testSectionId);
        return responseDto;
    }

    @Override
    public Page<GradableEvent<?>> getAllEventsPage(Long eventSectionId, Pageable pageable) {
        return testRepository.findAllByTestSection_Id(eventSectionId, pageable);
    }

}
