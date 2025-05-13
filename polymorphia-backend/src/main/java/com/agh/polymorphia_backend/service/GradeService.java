package com.agh.polymorphia_backend.service;

import com.agh.polymorphia_backend.dto.request.grade.GradeRequestDto;
import com.agh.polymorphia_backend.exception.database.InvalidArgumentException;
import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.model.event.gradable.GradableEvent;
import com.agh.polymorphia_backend.model.grade.Grade;
import com.agh.polymorphia_backend.model.user.Instructor;
import com.agh.polymorphia_backend.repository.course.AnimalRepository;
import com.agh.polymorphia_backend.repository.course.GradeRepository;
import com.agh.polymorphia_backend.repository.event.GradableEventRepository;
import com.agh.polymorphia_backend.service.validation.GradeRequestValidator;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class GradeService {
    private static final String DB_OBJECT_NOT_FOUND = "%s of id: %s not found";
    private static final String GRADABLE_EVENT = "GradableEvent";
    private static final String ANIMAL = "Animal";

    // repositories
    private final GradableEventRepository gradableEventRepository;
    private final GradeRepository gradeRepository;
    private final AnimalRepository animalRepository;

    // validator
    private final GradeRequestValidator gradeRequestValidator;

    @PreAuthorize("hasRole('INSTRUCTOR')")
    public Long gradeStudent(GradeRequestDto gradeRequestDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Instructor instructor = (Instructor) authentication.getPrincipal();

        GradableEvent gradableEvent = getGradableEvent(gradeRequestDto);

        gradeRequestValidator.validate(gradeRequestDto, gradableEvent, instructor);

        Grade grade = getGrade(gradeRequestDto, gradableEvent);


        return gradeRepository.save(grade).getId();
    }


    private GradableEvent getGradableEvent(GradeRequestDto gradeRequestDto) {
        return gradableEventRepository.findById(gradeRequestDto.gradableEventId())
                .orElseThrow(() -> new InvalidArgumentException(
                        String.format(DB_OBJECT_NOT_FOUND,
                                GRADABLE_EVENT,
                                gradeRequestDto.gradableEventId())
                ));
    }

    private Animal getAnimal(GradeRequestDto gradeRequestDto) {
        return animalRepository.findById(gradeRequestDto.animalId())
                .orElseThrow(() -> new InvalidArgumentException(
                        String.format(DB_OBJECT_NOT_FOUND,
                                ANIMAL,
                                gradeRequestDto.animalId())
                ));
    }

    private Grade getGrade(GradeRequestDto gradeRequestDto, GradableEvent gradableEvent) {
        Animal animal = getAnimal(gradeRequestDto);
        Grade grade = gradeRepository.findByGradableEventIdAndAnimalId(gradeRequestDto.gradableEventId(),
                gradeRequestDto.animalId()).orElse(Grade.builder().build());

        grade.setXp(gradeRequestDto.xp());
        grade.setAnimal(animal);
        grade.setGradableEvent(gradableEvent);
        return grade;
    }

}
