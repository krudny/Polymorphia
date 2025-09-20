package com.agh.polymorphia_backend.repository.hall_of_fame;

import com.agh.polymorphia_backend.dto.request.HallOfFameRequestDto;
import com.agh.polymorphia_backend.model.hall_of_fame.HallOfFame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface HallOfFameRepository extends JpaRepository<HallOfFame, Long> {
    String WHERE_NATIVE = """
            hof.course_id = :#{#requestDto.courseId()}
            AND (:#{#requestDto.searchTerm()} = '' OR
              (
                  (:#{#requestDto.searchBy().searchByAnimal()} = TRUE AND LOWER(hof.animal_name) LIKE LOWER(CONCAT('%', :#{#requestDto.searchTerm()}, '%')))
                  OR
                  (:#{#requestDto.searchBy().searchByStudent()} = TRUE AND LOWER(hof.student_name) LIKE LOWER(CONCAT('%', :#{#requestDto.searchTerm()}, '%')))
              ))
            AND (:#{#requestDto.groups().isEmpty()} = TRUE OR hof.group_name IN :#{#requestDto.groups()})
            """;

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
            @Param("studentId") Long studentId
    );

    Optional<HallOfFame> findByAnimalId(
             Long animalId
    );


    @Query(value = """
            SELECT COUNT(DISTINCT hof.animal_id)
            FROM hall_of_fame_view hof
            WHERE\s""" + WHERE_NATIVE
            , nativeQuery = true)
    long countByCourseIdAndFilters(@Param("requestDto") HallOfFameRequestDto requestDto);
}
