package com.agh.polymorphia_backend.repository.reward;

import com.agh.polymorphia_backend.model.reward.Reward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RewardRepository extends JpaRepository<Reward, Long> {
    List<Reward> findAllByKeyIn(List<String> keys);

    Reward findByKey(String key);
}