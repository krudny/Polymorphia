package com.agh.polymorphia_backend.repository.hall_of_fame;

import com.agh.polymorphia_backend.dto.request.HallOfFameRequestDto;
import com.agh.polymorphia_backend.model.hall_of_fame.HallOfFame;
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
              WHERE h.courseId = :#{#requestDto.courseId()}
                AND (:#{#requestDto.searchTerm()} = "" OR
                    (
                        (:#{#requestDto.searchBy().searchByAnimal()} = TRUE AND LOWER(h.animalName) LIKE LOWER(CONCAT('%', :#{#requestDto.searchTerm()}, '%')))
                        OR
                        (:#{#requestDto.searchBy().searchByStudent()} = TRUE AND LOWER(h.studentName) LIKE LOWER(CONCAT('%', :#{#requestDto.searchTerm()}, '%')))
                    ))
                AND (:#{#requestDto.groups().isEmpty()} = TRUE OR h.groupName IN :#{#requestDto.groups()})
            """)
    Page<HallOfFame> findHofPage(
            @Param("requestDto") HallOfFameRequestDto requestDto,
            Pageable pageable
    );

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
                SELECT hof.animal_id
                FROM hall_of_fame_view hof
                JOIN student_score_detail_view ssd ON ssd.animal_id = hof.animal_id
                WHERE\s""" + WHERE_NATIVE + """
                  AND ssd.event_section_name = :#{#requestDto.sortBy()}
                ORDER BY
                  CASE WHEN :#{#requestDto.sortOrder().name()} = 'ASC' THEN ssd.raw_xp END,
                  CASE WHEN :#{#requestDto.sortOrder().name()} = 'DESC' THEN ssd.raw_xp END DESC,
                  hof.position
                LIMIT :#{#requestDto.size()} OFFSET :#{#requestDto.size() * #requestDto.page()}
            """, nativeQuery = true)
    List<Long> findAnimalIdsSortedByEventSection(@Param("requestDto") HallOfFameRequestDto requestDto);

    List<HallOfFame> findByAnimalIdIn(List<Long> animalIds);

    @Query(value = """
                SELECT COUNT(DISTINCT hof.animal_id)
                FROM hall_of_fame_view hof
                WHERE\s""" + WHERE_NATIVE
            , nativeQuery = true)
    long countByCourseIdAndFilters(@Param("requestDto") HallOfFameRequestDto requestDto);
}
