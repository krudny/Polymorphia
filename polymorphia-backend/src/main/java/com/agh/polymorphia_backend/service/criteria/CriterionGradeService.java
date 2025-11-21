package com.agh.polymorphia_backend.service.criteria;

import com.agh.polymorphia_backend.dto.response.criteria.CriterionGradeResponseDto;
import com.agh.polymorphia_backend.model.criterion.Criterion;
import com.agh.polymorphia_backend.model.criterion.CriterionGrade;
import com.agh.polymorphia_backend.model.grade.Grade;
import com.agh.polymorphia_backend.repository.criterion.CriterionGradeRepository;
import com.agh.polymorphia_backend.service.criterion.CriterionService;
import com.agh.polymorphia_backend.service.mapper.CriterionGradeMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CriterionGradeService {

    private final CriterionGradeMapper criterionGradeMapper;
    private final CriterionService criterionService;
    private final CriterionGradeRepository criterionGradeRepository;

    public List<CriterionGradeResponseDto> getCriteriaGrades(Grade grade) {
        return grade.getCriteriaGrades().stream()
                .map(criterionGradeMapper::toCriterionGradeResponseDto)
                .toList();
    }

    public CriterionGrade fetchOrCreateCriterionGrade(Long criterionId, BigDecimal gainedXp, Grade grade) {
        List<CriterionGrade> existingCriteriaGrades = Optional.ofNullable(grade.getCriteriaGrades()).orElse(Collections.emptyList());
        CriterionGrade criterionGrade = existingCriteriaGrades.stream()
                .filter(cg -> cg.getCriterion().getId().equals(criterionId))
                .findFirst()
                .orElse(createCriterionGrade(criterionId, grade));

        criterionGrade.setXp(gainedXp);
        return criterionGrade;
    }

    public void saveAll(List<CriterionGrade> criteriaGrades) {
        criterionGradeRepository.saveAll(criteriaGrades);
    }

    private CriterionGrade createCriterionGrade(Long criterionId, Grade grade) {
        Criterion criterion = criterionService.findById(criterionId);

        return CriterionGrade.builder()
                .criterion(criterion)
                .grade(grade)
                .build();
    }


}
