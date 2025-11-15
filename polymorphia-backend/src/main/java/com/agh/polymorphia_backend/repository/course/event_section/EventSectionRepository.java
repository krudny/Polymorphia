package com.agh.polymorphia_backend.repository.course.event_section;

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

    List<EventSection> findByCourseId(Long courseId);

    @Query("SELECT es.course FROM EventSection es WHERE es.id = :eventSectionId")
    Optional<Course> findCourseById(@Param("eventSectionId") Long eventSectionId);
}
