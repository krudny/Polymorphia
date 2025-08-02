package com.agh.polymorphia_backend.repository;

import com.agh.polymorphia_backend.model.HallOfFame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface HallOfFameRepository extends JpaRepository<HallOfFame, Long> {
    @Query(value = """
    SELECT rank FROM (
        SELECT animal_id,
               ROW_NUMBER() OVER (ORDER BY total_points DESC) AS rank
        FROM hall_of_fame
    ) ranked
    WHERE animal_id = :animalId
    """, nativeQuery = true)
    int findRankByAnimalId(@Param("animalId") Long animalId);
}
