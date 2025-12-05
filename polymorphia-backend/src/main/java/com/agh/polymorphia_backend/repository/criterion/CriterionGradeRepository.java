package com.agh.polymorphia_backend.repository.criterion;

import com.agh.polymorphia_backend.model.criterion.CriterionGrade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CriterionGradeRepository extends JpaRepository<CriterionGrade, Long> {
    @Modifying
    @Query("DELETE FROM CriterionGrade cg WHERE cg.grade.animal.id IN :animalIds")
    void deleteCriteriaGradesForAnimals(@Param("animalIds") List<Long> animalIds);
}
