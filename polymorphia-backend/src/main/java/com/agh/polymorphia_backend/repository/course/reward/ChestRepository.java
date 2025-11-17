package com.agh.polymorphia_backend.repository.course.reward;

import com.agh.polymorphia_backend.model.course.reward.Chest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChestRepository extends JpaRepository<Chest, Long> {
    List<Chest> findAllByCourseId(Long courseId);

    @Query("""
    SELECT c FROM Chest c
    WHERE c.course.id = :courseId
    AND c.id NOT IN (
        SELECT r.id FROM Chest r
        JOIN AssignedChest ac ON r.id = ac.reward.id
        JOIN CriterionGrade cg ON ac.criterionGrade.id = cg.id
        JOIN Grade g ON cg.grade.id = g.id
        WHERE g.animal.id = :animalId
    )
    ORDER BY c.orderIndex
    """)
    List<Chest> findAvailableChestsForAnimal(Long courseId, Long animalId);
}
