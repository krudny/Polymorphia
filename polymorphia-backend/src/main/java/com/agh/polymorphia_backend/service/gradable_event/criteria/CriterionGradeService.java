package com.agh.polymorphia_backend.service.gradable_event.criteria;

import com.agh.polymorphia_backend.dto.response.criteria.CriterionGradeResponseDto;
import com.agh.polymorphia_backend.model.gradable_event.Grade;
import com.agh.polymorphia_backend.service.mapper.CriterionGradeMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CriterionGradeService {

    private final CriterionGradeMapper criterionGradeMapper;

    public List<CriterionGradeResponseDto> getCriteriaGrades(Grade grade) {
        return grade.getCriteriaGrades().stream()
                .map(criterionGradeMapper::toCriterionGradeResponseDto)
                .toList();
    }
}
