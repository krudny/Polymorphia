package com.agh.polymorphia_backend.service.grade;

import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import com.agh.polymorphia_backend.model.grade.Grade;
import com.agh.polymorphia_backend.model.user.student.Animal;
import com.agh.polymorphia_backend.repository.grade.GradeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class GradeService {
    private final GradeRepository gradeRepository;

    public List<Grade> getAnimalGrades(Long animalId) {
        return gradeRepository.findAllByAnimalId(animalId);
    }

    public Optional<Grade> getGradeByAnimalIdAndGradableEventId(Long animalId, Long gradableEventId) {
        return gradeRepository.findByAnimalIdAndGradableEventId(animalId, gradableEventId);
    }

    public Grade getOrCreateGrade(Animal animal, GradableEvent gradableEvent, String comment) {
        return getGradeByAnimalIdAndGradableEventId(animal.getId(), gradableEvent.getId())
                .orElse(createGrade(animal, gradableEvent, comment));

    }

    public void saveGrade(Grade grade) {
        gradeRepository.save(grade);
    }


    private Grade createGrade(Animal animal, GradableEvent gradableEvent, String comment) {
        return Grade.builder()
                .animal(animal)
                .gradableEvent(gradableEvent)
                .comment(comment)
                .build();
    }

}
