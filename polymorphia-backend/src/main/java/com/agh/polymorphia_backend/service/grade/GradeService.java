package com.agh.polymorphia_backend.service.grade;

import com.agh.polymorphia_backend.model.grade.Grade;
import com.agh.polymorphia_backend.dto.response.user.StudentActivityResponseDto;
import com.agh.polymorphia_backend.repository.gradable_event.StudentActivityProjection;
import com.agh.polymorphia_backend.repository.gradable_event.GradeRepository;
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
    private final AnimalService animalService;
    private final AccessAuthorizer accessAuthorizer;
    private final StudentDetailsMapper studentDetailsMapper;

    public List<Grade> getAnimalGrades(Long animalId) {
        return gradeRepository.findAllByAnimalId(animalId);
    }

    public Optional<Grade> getGradeByAnimalIdAndGradableEventId(Long animalId, Long gradableEventId) {
        return gradeRepository.findAllByAnimalIdAndGradableEventId(animalId, gradableEventId);
    }

    public List<StudentActivityResponseDto> getStudentActivity(Long studentId, Long courseId) {
        accessAuthorizer.authorizeStudentDataAccess(courseId, studentId);
        Long animalId = animalService.getAnimal(studentId, courseId).getId();
        List<StudentActivityProjection> projections = gradeRepository.findStudentActivity(animalId);
        return projections.stream()
                .map(studentDetailsMapper::studentActivityProjectionToDto)
                .toList();
    }
}
