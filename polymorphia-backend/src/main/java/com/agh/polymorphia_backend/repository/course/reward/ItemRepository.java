package com.agh.polymorphia_backend.repository.course.reward;

import com.agh.polymorphia_backend.model.course.reward.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findAllByCourseId(Long courseId);

    @Query("""
    SELECT i FROM Item i
    WHERE i.course.id = :courseId
    AND i.id NOT IN (
        SELECT r.id FROM Item r
        JOIN AssignedItem ai ON r.id = ai.reward.id
        JOIN AssignedChest ac ON ai.assignedChest.id = ac.id
        JOIN CriterionGrade cg ON ac.criterionGrade.id = cg.id
        JOIN Grade g ON cg.grade.id = g.id
        WHERE g.animal.id = :animalId
    )
    ORDER BY i.orderIndex
    """)
    List<Item> findAvailableItemsForAnimal(Long courseId, Long animalId);
}