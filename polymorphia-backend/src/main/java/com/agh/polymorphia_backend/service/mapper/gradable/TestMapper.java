package com.agh.polymorphia_backend.service.mapper.gradable;

import com.agh.polymorphia_backend.dto.response.event.gradable.GradableEventResponseDto;
import com.agh.polymorphia_backend.dto.response.event.gradable.GradableEventShortResponseDto;
import com.agh.polymorphia_backend.dto.response.event.gradable.test.TestResponseDto;
import com.agh.polymorphia_backend.exception.database.InvalidArgumentException;
import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.model.event.gradable.GradableEvent;
import com.agh.polymorphia_backend.model.event.gradable.Test;
import com.agh.polymorphia_backend.service.GradeService;
import org.springframework.stereotype.Service;

import static com.agh.polymorphia_backend.service.DbExtractingUtil.DB_OBJECT_NOT_FOUND;
import static com.agh.polymorphia_backend.service.DbExtractingUtil.FIELD_GRADABLE_EVENT;

@Service
public class TestMapper extends GradableEventMapper {
    public TestMapper(GradeService gradeService) {
        super(gradeService);
    }

    @Override
    public GradableEventResponseDto toGradableEventResponseDto(GradableEvent<?> gradableEvent, Animal animal) {
        Test test = getTest(gradableEvent);
        TestResponseDto event = TestResponseDto.builder()
                .id(test.getId())
                .name(test.getName())
                .topic(test.getTopic())
                .hidden(test.getHidden())
                .maxXp(test.getMaxXp())
                .build();

        return setGradeAndRewards(event, test, animal);
    }

    @Override
    public GradableEventShortResponseDto toShortResponseDto(GradableEvent<?> test, Animal animal) {
        return GradableEventShortResponseDto.builder()
                .id(test.getId())
                .name(((Test) test).getName())
                .topic(((Test) test).getTopic())
                .build();
    }

    private Test getTest(GradableEvent<?> event) {
        try {
            return (Test) event;
        } catch (ClassCastException e) {
            throw new InvalidArgumentException(String.format(
                    DB_OBJECT_NOT_FOUND,
                    FIELD_GRADABLE_EVENT,
                    event.getId()
            ));
        }
    }
}
