package com.agh.polymorphia_backend.repository.event;

import com.agh.polymorphia_backend.model.event.section.EventSection;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventSectionRepository extends JpaRepository<EventSection, Long> {
    List<EventSection> findByCourseId(Long courseId);
}
