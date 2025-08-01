package com.agh.polymorphia_backend.repository.grade;

import com.agh.polymorphia_backend.model.grade.reward.AssignedItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface AssignedItemRepository extends JpaRepository<AssignedItem, Long> {
    @Query("select ai from AssignedItem ai join ai.assignedChest ac " +
            "join ac.criterionGrade cg join cg.grade g " +
            "join g.gradableEvent ge join ge.eventSection e " +
            "where e.id=:eventSectionId and ai.used=true and ac.opened=true")
    Set<AssignedItem> findAllUsedByEventSectionId(Long eventSectionId);
}
