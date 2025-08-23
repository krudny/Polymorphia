package com.agh.polymorphia_backend.repository;

import com.agh.polymorphia_backend.model.hall_of_fame.HallOfFame;
import com.agh.polymorphia_backend.model.hall_of_fame.SearchBy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HallOfFameRepository extends JpaRepository<HallOfFame, Long> {
    @Query("""
              SELECT h
              FROM HallOfFame h
              WHERE h.courseId = :courseId
                AND (:searchTerm = "" OR
                    (
                        (:#{#searchBy.searchByAnimal()} = TRUE AND LOWER(h.animalName) LIKE LOWER(CONCAT('%', :searchTerm, '%')))
                        OR
                        (:#{#searchBy.searchByStudent()} = TRUE AND LOWER(h.studentName) LIKE LOWER(CONCAT('%', :searchTerm, '%')))
                    ))
                AND (:groups IS NULL OR h.groupName IN :groups)
            """)
    Page<HallOfFame> findHofPage(
            @Param("courseId") Long courseId,
            @Param("searchTerm") String searchTerm,
            @Param("searchBy") SearchBy searchBy,
            @Param("groups") List<String> groups,
            Pageable pageable
    );

    @Query(value = """
                SELECT hof.animal_id
                FROM hall_of_fame_view hof
                JOIN student_score_detail_view ssd ON ssd.animal_id = hof.animal_id
                WHERE hof.course_id = :courseId
                  AND (:searchTerm = '' OR LOWER(hof.animal_name) LIKE LOWER(CONCAT('%', :searchTerm, '%')))
                  AND (cardinality(:groups) = 0 OR hof.group_name IN (:groups))
                  AND ssd.event_section_name = :sortBy
                ORDER BY
                  CASE WHEN :sortOrder = 'ASC' THEN ssd.raw_xp END,
                  CASE WHEN :sortOrder = 'DESC' THEN ssd.raw_xp END DESC
                LIMIT :limit OFFSET :offset
            """, nativeQuery = true)
    List<Long> findAnimalIdsSortedByEventSection(
            @Param("courseId") Long courseId,
            @Param("searchTerm") String searchTerm,
            @Param("groups") String[] groups,
            @Param("sortBy") String sortBy,
            @Param("sortOrder") String sortOrder,
            @Param("limit") int limit,
            @Param("offset") int offset
    );

    List<HallOfFame> findByAnimalIdIn(List<Long> animalIds);

    @Query(value = """
                SELECT COUNT(DISTINCT hof.animal_id)
                FROM hall_of_fame_view hof
                WHERE hof.course_id = :courseId
                  AND (:searchTerm = '' OR LOWER(hof.animal_name) LIKE LOWER(CONCAT('%', :searchTerm, '%')))
                  AND (cardinality(:groups) = 0 OR hof.group_name IN (:groups))
            """, nativeQuery = true)
    long countByCourseIdAndFilters(
            @Param("courseId") Long courseId,
            @Param("searchTerm") String searchTerm,
            @Param("groups") String[] groups
    );
}
