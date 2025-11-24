package com.agh.polymorphia_backend.repository.event_section;

import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.event_section.EventSection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface EventSectionRepository extends JpaRepository<EventSection, Long> {
    List<EventSection> findByIdIn(Set<Long> ids);

    boolean existsByCourseIdAndName(Long courseId, String name);

    @Query("SELECT es.course FROM EventSection es WHERE es.id = :eventSectionId")
    Optional<Course> findCourseById(@Param("eventSectionId") Long eventSectionId);

    @Query("""
        SELECT es FROM EventSection es
        WHERE es.course.id = :courseId
        ORDER BY es.orderIndex ASC
    """)
    List<EventSection> findByCourseIdWithHidden(@Param("courseId") Long courseId);

    @Query("""
        SELECT DISTINCT es 
        FROM EventSection es
        WHERE es.course.id = :courseId
          AND es.isHidden = false
          AND EXISTS (
              SELECT 1 
              FROM GradableEvent ge 
              WHERE ge.eventSection.id = es.id 
                AND ge.isHidden = false
          )
        ORDER BY es.orderIndex ASC
    """)
    List<EventSection> findByCourseIdWithoutHidden(@Param("courseId") Long courseId);

    @Query("""
    SELECT es 
    FROM EventSection es
    WHERE es.id = :eventSectionId
      AND (
          :userRole <> 'STUDENT'
          OR (
              es.isHidden = false 
              AND EXISTS (
                  SELECT 1 
                  FROM GradableEvent g 
                  WHERE g.eventSection.id = es.id 
                    AND g.isHidden = false
              )
          )
      )
    """)
    Optional<EventSection> findByIdWithVisibilityCheck(
            @Param("eventSectionId") Long eventSectionId,
            @Param("userRole") String userRole
    );
}
