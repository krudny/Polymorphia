package com.agh.polymorphia_backend.repository.reward.assigned;

import com.agh.polymorphia_backend.model.reward.assigned.AssignedReward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssignedRewardRepository extends JpaRepository<AssignedReward, Long> {
}