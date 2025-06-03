package com.agh.polymorphia_backend.service.event.gradable;

import com.agh.polymorphia_backend.dto.response.event.gradable.CourseworkTestSectionResponseDto;
import com.agh.polymorphia_backend.dto.response.event.section.EventSectionResponseDto;
import com.agh.polymorphia_backend.repository.event.gradable.GradableEventRepository;
import com.agh.polymorphia_backend.repository.event.section.EventSectionRepository;
import com.agh.polymorphia_backend.service.GradeService;
import com.agh.polymorphia_backend.service.course.AnimalService;
import com.agh.polymorphia_backend.service.mapper.gradable.CourseworkMapper;
import org.springframework.stereotype.Service;

@Service
public class CourseworkSectionService extends EventSectionService {

    public CourseworkSectionService(CourseworkMapper mapper,
                                    AnimalService animalService,
                                    EventSectionRepository eventSectionRepository,
                                    XpCalculator xpCalculator,
                                    GradeService gradeService,
                                    GradableEventRepository gradableEventRepository) {
        super(mapper, gradeService, animalService, eventSectionRepository, xpCalculator, gradableEventRepository);
    }


    @Override
    public EventSectionResponseDto getAllEvents(Long courseworkSectionId) {
        EventSectionResponseDto responseDto = getAllGradableEvents(
                new CourseworkTestSectionResponseDto(),
                courseworkSectionId
        );
        setGradableEventsShortResponseDto((CourseworkTestSectionResponseDto) responseDto, courseworkSectionId);

        return responseDto;
    }

}
