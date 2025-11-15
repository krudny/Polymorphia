package com.agh.polymorphia_backend.repository.reward.assigned;

import com.agh.polymorphia_backend.model.reward.assigned.AssignedItem;
import com.agh.polymorphia_backend.model.criterion.CriterionGrade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AssignedItemRepository extends JpaRepository<AssignedItem, Long> {
    @Query(value = """
            SELECT ai
            FROM AssignedItem ai
            JOIN ai.criterionGrade cg
            JOIN cg.grade g
            WHERE g.animal.id = :animalId
            """
    )
    List<AssignedItem> findAnimalAssignedItems(Long animalId);

    List<AssignedItem> findByCriterionGrade(CriterionGrade criterionGrade);
}
