package com.agh.polymorphia_backend.repository.course.reward.assigned;

import com.agh.polymorphia_backend.model.course.reward.assigned.AssignedChest;
import com.agh.polymorphia_backend.model.criterion.CriterionGrade;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AssignedChestRepository extends JpaRepository<AssignedChest, Long> {
    String SELECT_ASSIGNED_CHEST_NOT_USED = """
            SELECT ac
            FROM AssignedChest ac
            JOIN AssignedReward ar ON ar.id = ac.id
            WHERE ar.isUsed = false AND ac.id = :assignedChestId
            """;

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
    @Query(value = SELECT_ASSIGNED_CHEST_NOT_USED)
    Optional<AssignedChest> findNotUsedAssignedChestsByIdWithLock(@Param("assignedChestId") Long assignedChestId);

    @Query(value = SELECT_ASSIGNED_CHEST_NOT_USED)
    Optional<AssignedChest> findNotUsedAssignedChestsById(@Param("assignedChestId") Long assignedChestId);
}
