package com.agh.polymorphia_backend.repository.gradable_event;

import com.agh.polymorphia_backend.model.criterion.CriterionGrade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CriterionGradeRepository extends JpaRepository<CriterionGrade, Long> {
    @Query(value = """
                select cg
                from CriterionGrade cg
                join cg.grade g
                where g.animal.id = :animalId
            """)
    List<CriterionGrade> findAllAnimalCriteriaGrades(Long animalId);
}
