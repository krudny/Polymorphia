package com.agh.polymorphia_backend.service.gradable_event;

import com.agh.polymorphia_backend.model.gradable_event.Grade;
import com.agh.polymorphia_backend.repository.gradable_event.GradeRepository;
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
        return gradeRepository.findAllByAnimalIdAndGradableEventId(animalId, gradableEventId);
    }
}
