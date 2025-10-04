package com.agh.polymorphia_backend.repository.course.reward;

import com.agh.polymorphia_backend.model.course.reward.Chest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChestRepository extends JpaRepository<Chest, Long> {
    List<Chest> findAllByCourseId(Long courseId);

    @Query("""
                SELECT c FROM Chest c
                WHERE c.course.id = :courseId
                  AND (:ids is null OR c.id NOT IN :ids)
            """)
    List<Chest> findAllByCourseIdAndIdNotIn(Long courseId, List<Long> ids);
}
