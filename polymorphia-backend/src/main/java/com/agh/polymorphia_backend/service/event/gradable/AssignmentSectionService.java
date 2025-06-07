package com.agh.polymorphia_backend.service.event.gradable;

import com.agh.polymorphia_backend.dto.response.event.section.EventSectionResponseDto;
import com.agh.polymorphia_backend.repository.event.gradable.GradableEventRepository;
import com.agh.polymorphia_backend.repository.event.section.EventSectionRepository;
import com.agh.polymorphia_backend.service.GradeService;
import com.agh.polymorphia_backend.service.course.AnimalService;
import com.agh.polymorphia_backend.service.mapper.gradable.AssignmentMapper;
import org.springframework.stereotype.Service;

@Service
public class AssignmentSectionService extends EventSectionService {

    public AssignmentSectionService(AssignmentMapper mapper,
                                    AnimalService animalService,
                                    EventSectionRepository eventSectionRepository,
                                    XpCalculator xpCalculator,
                                    GradeService gradeService,
                                    GradableEventRepository gradableEventRepository) {
        super(mapper, gradeService, animalService, eventSectionRepository, xpCalculator, gradableEventRepository);
    }


    @Override
    public EventSectionResponseDto getAllEvents(Long assignmentSectionId) {
        EventSectionResponseDto responseDto = new EventSectionResponseDto();
        addGradableEventsSummary(responseDto, assignmentSectionId);

        return responseDto;
    }

}
