package com.agh.polymorphia_backend.repository.reward.assigned;

import com.agh.polymorphia_backend.model.reward.assigned.AssignedReward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssignedRewardRepository extends JpaRepository<AssignedReward, Long> {

    @Modifying
    @Query("DELETE FROM AssignedReward ar WHERE ar.criterionGrade.grade.animal.id IN :animalIds")
    void deleteAssignedRewardsForAnimals(@Param("animalIds") List<Long> animalIds);
}