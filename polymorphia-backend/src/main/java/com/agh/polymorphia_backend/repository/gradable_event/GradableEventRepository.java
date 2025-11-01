package com.agh.polymorphia_backend.repository.gradable_event;

import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GradableEventRepository extends JpaRepository<GradableEvent, Long> {
    @Query("SELECT ge.eventSection.course.id FROM GradableEvent ge WHERE ge.id = :id")
    Optional<Long> getCourseIdByGradableEventId(@Param("id") Long id);
}
