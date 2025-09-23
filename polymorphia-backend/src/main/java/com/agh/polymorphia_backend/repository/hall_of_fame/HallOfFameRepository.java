package com.agh.polymorphia_backend.repository.hall_of_fame;

import com.agh.polymorphia_backend.dto.request.hall_of_fame.HallOfFameRequestDto;
import com.agh.polymorphia_backend.model.hall_of_fame.HallOfFameEntry;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface HallOfFameRepository extends JpaRepository<HallOfFameEntry, Long> {
    String WHERE_CLAUSE = """
            hof.courseId = :#{#requestDto.courseId()}
            and (
              :#{#requestDto.searchTerm()} = '' or
              (
                (:#{#requestDto.searchBy().searchByAnimal()} = true
                   and lower(hof.animalName) like lower(concat('%', :#{#requestDto.searchTerm()}, '%')))
                or
                (:#{#requestDto.searchBy().searchByStudent()} = true
                   and lower(hof.studentName) like lower(concat('%', :#{#requestDto.searchTerm()}, '%')))
              )
            )
            and (
              :#{#requestDto.groups().isEmpty()} = true
              or hof.groupName in :#{#requestDto.groups()}
            )
            """;

    @Query("""
            select hof
            from HallOfFameEntry hof
            where\s""" + WHERE_CLAUSE)
    Page<HallOfFameEntry> findHofPageFromOverviewField(@Param("requestDto") HallOfFameRequestDto requestDto, Pageable pageable);

    @Query(value = """
            select hof
            from HallOfFameEntry hof
            join StudentScoreDetail ssd
                 on ssd.animalId = hof.animalId
            where\s""" + WHERE_CLAUSE + """
                and ssd.eventSectionName = :#{#requestDto.sortBy()}
              order by
                case when :#{#requestDto.sortOrder().name()} = 'ASC' then ssd.rawXp end asc,
                case when :#{#requestDto.sortOrder().name()} = 'DESC' then ssd.rawXp end desc,
                hof.position asc
            """, countQuery = """
            select count(distinct hof.animalId)
            from HallOfFameEntry hof
            where\s""" + WHERE_CLAUSE)
    Page<HallOfFameEntry> findHofPageFromEventSection(@Param("requestDto") HallOfFameRequestDto requestDto, Pageable pageable);

    @Query(value = """
                SELECT hof.*
                FROM hall_of_fame_view hof
                JOIN animals a ON hof.animal_id = a.id
                JOIN students s ON a.student_id = s.user_id
                WHERE hof.course_id = :courseId
                  AND s.user_id = :studentId
                LIMIT 1
            """, nativeQuery = true)
    Optional<HallOfFameEntry> findByStudentIdAndCourseId(

            @Param("courseId") Long courseId,
            @Param("studentId") Long studentId
    );


    @Query(value = """
            select count(distinct hof.animalId)
            from HallOfFameEntry hof
            where\s""" + WHERE_CLAUSE
    )
    long countByCourseIdAndFilters(@Param("requestDto") HallOfFameRequestDto requestDto);
}
