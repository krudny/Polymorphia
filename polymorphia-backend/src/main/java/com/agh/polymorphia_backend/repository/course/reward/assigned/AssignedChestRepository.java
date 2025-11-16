package com.agh.polymorphia_backend.repository.course.reward.assigned;

import com.agh.polymorphia_backend.model.course.reward.assigned.AssignedChest;
import com.agh.polymorphia_backend.model.criterion.CriterionGrade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AssignedChestRepository extends JpaRepository<AssignedChest, Long> {
    @Query(value = """
            SELECT ac
            FROM AssignedChest ac
            JOIN ac.criterionGrade cg
            JOIN cg.grade g
            WHERE g.animal.id = :animalId
            """
    )
    List<AssignedChest> findAnimalAssignedChests(Long animalId);

    List<AssignedChest> findByCriterionGrade(CriterionGrade criterionGrade);


    @Query(value = """
            SELECT ac
            FROM AssignedChest ac
            JOIN AssignedReward ar ON ar.id = ac.id
            WHERE ar.isUsed = false AND ac.id = :assignedChestId
            """)
    Optional<AssignedChest> findNotUsedAssignedChestsById(Long assignedChestId);
}
