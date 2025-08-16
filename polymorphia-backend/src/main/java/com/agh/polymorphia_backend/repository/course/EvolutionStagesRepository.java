package com.agh.polymorphia_backend.repository.course;

import com.agh.polymorphia_backend.model.course.EvolutionStage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface EvolutionStagesRepository extends JpaRepository<EvolutionStage, Long> {
    List<EvolutionStage> findAllByCourseId(Long courseId);

    @Query(value = """
        SELECT * FROM evolution_stages
        WHERE course_id = :courseId
          AND min_xp <= :totalPoints
        ORDER BY min_xp DESC
        LIMIT 1
        """, nativeQuery = true)
    EvolutionStage findCurrentStage(@Param("courseId") Long courseId,
                                    @Param("totalPoints") BigDecimal totalPoints);
}
