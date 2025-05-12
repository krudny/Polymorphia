package com.agh.polymorphia_backend.service;

import com.agh.polymorphia_backend.dto.request.grade.GradeRequestDto;
import com.agh.polymorphia_backend.exception.database.InvalidArgumentException;
import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.model.course.CourseGroup;
import com.agh.polymorphia_backend.model.event.gradable.GradableEvent;
import com.agh.polymorphia_backend.model.grade.Grade;
import com.agh.polymorphia_backend.repository.course.CourseGroupRepository;
import com.agh.polymorphia_backend.repository.course.GradeRepository;
import com.agh.polymorphia_backend.repository.event.GradableEventRepository;
import com.agh.polymorphia_backend.service.validation.GradeRequestValidator;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;

@Service
@AllArgsConstructor
public class GradeService {
    private static final String DB_OBJECT_NOT_FOUND = "%s of id: %s not found";
    private static final String GRADABLE_EVENT = "GradableEvent";
    private static final String COURSE_GROUP = "CourseGroup";

    // repositories
    private final GradableEventRepository gradableEventRepository;
    private final CourseGroupRepository courseGroupRepository;
    private final GradeRepository gradeRepository;

    // validator
    private final GradeRequestValidator gradeRequestValidator;

    public Long gradeStudent(GradeRequestDto gradeRequestDto) {
        CourseGroup courseGroup = getCourseGroup(gradeRequestDto);
        GradableEvent gradableEvent = getGradableEvent(gradeRequestDto);

        gradeRequestValidator.validate(gradeRequestDto, gradableEvent, courseGroup);
        Animal animal = courseGroup.getAnimals().stream()
                .filter(animal1 -> animal1.getStudent().getId()
                        .equals(gradeRequestDto.studentId()))
                .findFirst()
                .orElse(null);
        ZonedDateTime now = ZonedDateTime.now();

        Grade grade = Grade.builder()
                .xp(gradeRequestDto.xp())
                .animal(animal)
                .gradableEvent(gradableEvent)
                .createdDate(now)
                .modifiedDate(now)
                .build();

        return gradeRepository.save(grade).getId();
    }

    private CourseGroup getCourseGroup(GradeRequestDto gradeRequestDto) {
        return courseGroupRepository.findById(gradeRequestDto.courseGroupId())
                .orElseThrow(() -> new InvalidArgumentException(
                        String.format(DB_OBJECT_NOT_FOUND,
                                COURSE_GROUP,
                                gradeRequestDto.courseGroupId())
                ));
    }

    private GradableEvent getGradableEvent(GradeRequestDto gradeRequestDto) {
        return gradableEventRepository.findById(gradeRequestDto.gradableEventId())
                .orElseThrow(() -> new InvalidArgumentException(
                        String.format(DB_OBJECT_NOT_FOUND,
                                GRADABLE_EVENT,
                                gradeRequestDto.gradableEventId())
                ));
    }


}
