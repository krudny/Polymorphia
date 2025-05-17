package com.agh.polymorphia_backend.repository.event.gradable;

import com.agh.polymorphia_backend.model.event.gradable.GradableEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface GradableEventRepository extends JpaRepository<GradableEvent<?>, Long> {
    @Query("SELECT g.maxChests FROM GradableEventChest g  WHERE g.gradableEvent.id=:gradableEventId AND g.chest.id=:chestId")
    Optional<Integer> findMaxChestsByGradableEventIdAndChestId(Long gradableEventId, Long chestId);
}
