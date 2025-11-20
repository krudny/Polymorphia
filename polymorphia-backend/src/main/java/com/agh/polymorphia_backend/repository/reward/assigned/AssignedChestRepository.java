package com.agh.polymorphia_backend.repository.reward.assigned;

import com.agh.polymorphia_backend.model.criterion.CriterionGrade;
import com.agh.polymorphia_backend.model.reward.assigned.AssignedChest;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AssignedChestRepository extends JpaRepository<AssignedChest, Long> {
    @Query(value = """
            SELECT ac
            FROM AssignedChest ac
            JOIN ac.criterionGrade cg
            JOIN cg.grade g
            WHERE g.animal.id = :animalId
            AND (:filterType = 'ALL'
                 OR (:filterType = 'USED' AND ac.isUsed = true)
                 OR (:filterType = 'UNUSED' AND ac.isUsed = false))
            """
    )
    List<AssignedChest> findAnimalAssignedChests(
            @Param("animalId") Long animalId,
            @Param("filterType") String filterType
    );

    List<AssignedChest> findByCriterionGrade(CriterionGrade criterionGrade);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query(value = """
            SELECT ac
            FROM AssignedChest ac
            JOIN ac.criterionGrade cg
            JOIN cg.grade g
            WHERE ac.id = :assignedChestId
            AND g.animal.id = :animalId
            """
    )
    Optional<AssignedChest> findByIdAndAnimalIdWithLock(
            @Param("assignedChestId") Long assignedChestId,
            @Param("animalId") Long animalId
    );

    @Query(value = """
            SELECT ac
            FROM AssignedChest ac
            JOIN ac.criterionGrade cg
            JOIN cg.grade g
            WHERE ac.id = :assignedChestId
            AND g.animal.id = :animalId
            """
    )
    Optional<AssignedChest> findByIdAndAnimalId(
            @Param("assignedChestId") Long assignedChestId,
            @Param("animalId") Long animalId
    );
}
