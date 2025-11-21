package com.agh.polymorphia_backend.service.grade;

import com.agh.polymorphia_backend.model.grade.Grade;
import com.agh.polymorphia_backend.dto.response.user.StudentActivityResponseDto;
import com.agh.polymorphia_backend.repository.grade.projections.StudentActivityProjection;
import com.agh.polymorphia_backend.repository.grade.GradeRepository;
import com.agh.polymorphia_backend.service.mapper.StudentDetailsMapper;
import com.agh.polymorphia_backend.service.student.AnimalService;
import com.agh.polymorphia_backend.service.validation.AccessAuthorizer;
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
