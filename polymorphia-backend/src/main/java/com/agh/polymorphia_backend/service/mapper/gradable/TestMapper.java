package com.agh.polymorphia_backend.service.mapper.gradable;

import com.agh.polymorphia_backend.dto.response.event.section.GradableEventResponseDto;
import com.agh.polymorphia_backend.dto.response.event.section.test.TestEventResponseDto;
import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.model.event.gradable.Test;
import com.agh.polymorphia_backend.service.GradeService;
import org.springframework.stereotype.Service;

@Service
public class TestMapper extends GradableEventMapper {
    public TestMapper(GradeService gradeService) {
        super(gradeService);
    }

    public GradableEventResponseDto testToGradableEventResponseDto(Test test, Animal animal) {
        TestEventResponseDto event = new TestEventResponseDto();

        event.setId(test.getId());
        event.setName(test.getName());
        event.setHidden(test.getHidden());
        event.setMaxXp(test.getMaxXp());

        return setGradeAndRewards(event, test, animal);
    }
}
