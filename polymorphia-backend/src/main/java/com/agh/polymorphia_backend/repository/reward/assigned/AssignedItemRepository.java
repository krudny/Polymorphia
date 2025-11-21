package com.agh.polymorphia_backend.repository.reward.assigned;

import com.agh.polymorphia_backend.model.criterion.CriterionGrade;
import com.agh.polymorphia_backend.model.reward.assigned.AssignedItem;
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

    @Query(value = """
            SELECT ai
            FROM AssignedItem ai
            JOIN ai.criterionGrade cg
            JOIN cg.grade g
            WHERE g.animal.id = :animalId AND cg.criterion.id != :criterionId
            """
    )
    List<AssignedItem> findAnimalAssignedItemsWithoutCriterionItems(Long animalId, Long criterionId);

    @Query(
            """
                        select ai
                        from AssignedItem ai
                        where ai.criterionGrade=:criterionGrade AND ai.assignedChest=null
                    """
    )
    List<AssignedItem> findByCriterionGrade(CriterionGrade criterionGrade);
}
