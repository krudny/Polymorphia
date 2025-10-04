package com.agh.polymorphia_backend.service.gradable_event;

import com.agh.polymorphia_backend.model.criterion.CriterionGrade;
import com.agh.polymorphia_backend.repository.gradable_event.CriterionGradeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CriterionGradeService {
    private final CriterionGradeRepository criterionGradeRepository;

    public List<CriterionGrade> getAnimalCriteriaGrades(Long animalId) {
        return criterionGradeRepository.findAllAnimalCriteriaGrades(animalId);
    }
}
