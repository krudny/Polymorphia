package com.agh.polymorphia_backend.repository.course.event_section;

import com.agh.polymorphia_backend.model.event_section.EventSection;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface EventSectionRepository extends JpaRepository<EventSection, Long> {
    List<EventSection> findByIdIn(Set<Long> ids);

    boolean existsByCourseIdAndName(Long courseId, String name);
}
