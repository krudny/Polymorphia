package com.agh.polymorphia_backend.repository.hall_of_fame;

import com.agh.polymorphia_backend.model.hall_of_fame.HallOfFame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface HallOfFameRepository extends JpaRepository<HallOfFame, Long> {
    @Query(value = """
                SELECT hof.*
                FROM hall_of_fame_view hof
                JOIN animals a ON hof.animal_id = a.id
                JOIN students s ON a.student_id = s.user_id
                WHERE hof.course_id = :courseId
                  AND s.user_id = :studentId
                LIMIT 1
            """, nativeQuery = true)
    Optional<HallOfFame> findByStudentIdAndCourseId(

            @Param("courseId") Long courseId,
            @Param("studentId") Long studentId);
}
