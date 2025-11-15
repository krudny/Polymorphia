package com.agh.polymorphia_backend.repository.course.reward.assigned;

import com.agh.polymorphia_backend.model.reward.assigned.AssignedReward;
import com.agh.polymorphia_backend.model.reward.assigned.AssignedItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssignedRewardRepository extends JpaRepository<AssignedReward, Long> {
    @Query("""
    SELECT ai
    FROM AssignedItem ai
    JOIN ai.assignedChest ac
    JOIN ai.criterionGrade cg
    JOIN cg.grade g
    JOIN g.gradableEvent ge
    JOIN FETCH ai.reward r
    WHERE g.animal.id = :animalId
      AND ac.isUsed = true
      AND ge.eventSection.id = :eventSectionId
""")
    List<AssignedItem> findAssignedItemsByAnimalAndEventSection(
            @Param("animalId") Long animalId,
            @Param("eventSectionId") Long eventSectionId
    );
}
