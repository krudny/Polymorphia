package com.agh.polymorphia_backend.service.event.gradable;

import com.agh.polymorphia_backend.dto.response.event.section.EventSectionResponseDto;
import com.agh.polymorphia_backend.model.event.gradable.GradableEvent;
import com.agh.polymorphia_backend.repository.event.gradable.AssignmentRepository;
import com.agh.polymorphia_backend.repository.event.gradable.GradableEventRepository;
import com.agh.polymorphia_backend.repository.event.section.EventSectionRepository;
import com.agh.polymorphia_backend.service.GradeService;
import com.agh.polymorphia_backend.service.course.AnimalService;
import com.agh.polymorphia_backend.service.mapper.gradable.AssignmentMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class AssignmentSectionService extends EventSectionService {

    private final AssignmentRepository assignmentRepository;

    public AssignmentSectionService(AssignmentMapper mapper,
                                    AnimalService animalService,
                                    EventSectionRepository eventSectionRepository,
                                    XpCalculator xpCalculator,
                                    GradeService gradeService,
                                    GradableEventRepository gradableEventRepository, AssignmentRepository assignmentRepository) {
        super(mapper, gradeService, animalService, eventSectionRepository, xpCalculator, gradableEventRepository);
        this.assignmentRepository = assignmentRepository;
    }


    @Override
    public EventSectionResponseDto getAllEvents(Long assignmentSectionId) {
        EventSectionResponseDto responseDto = new EventSectionResponseDto();
        addGradableEventsSummary(responseDto, assignmentSectionId);

        return responseDto;
    }

    @Override
    public Page<GradableEvent<?>> getAllEventsPage(Long eventSectionId, Pageable pageable) {
        return assignmentRepository.findAllByAssignmentSection_Id(eventSectionId, pageable);
    }
}
