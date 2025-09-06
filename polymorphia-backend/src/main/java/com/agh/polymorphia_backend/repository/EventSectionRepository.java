package com.agh.polymorphia_backend.repository;

import com.agh.polymorphia_backend.model.event_section.EventSection;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventSectionRepository extends JpaRepository<EventSection, Long> {
    boolean existsByCourseIdAndName(Long courseId, String name);
}