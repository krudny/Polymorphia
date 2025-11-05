package com.agh.polymorphia_backend.service.grade;

import com.agh.polymorphia_backend.model.gradable_event.Grade;
import com.agh.polymorphia_backend.repository.gradable_event.GradeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class GradeService {
    private final GradeRepository gradeRepository;

    public List<Grade> getAnimalGrades(Long animalId) {
        return gradeRepository.findAllByAnimalId(animalId);
    }
}
