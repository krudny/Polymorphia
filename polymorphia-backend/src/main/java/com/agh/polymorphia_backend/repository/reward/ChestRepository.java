package com.agh.polymorphia_backend.repository.reward;

import com.agh.polymorphia_backend.model.reward.Chest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChestRepository extends JpaRepository<Chest, Long> {
    List<Chest> findAllByCourseId(Long courseId);

    @Query("""
                SELECT c FROM Chest c
                WHERE c.course.id = :courseId
                  AND (:excludedChestIds is null OR c.id NOT IN :excludedChestIds)
            """)
    List<Chest> findAllByCourseIdAndChestIdNotIn(Long courseId, List<Long> excludedChestIds);
}
