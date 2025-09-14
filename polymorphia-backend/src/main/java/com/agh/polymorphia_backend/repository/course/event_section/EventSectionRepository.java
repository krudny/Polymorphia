package com.agh.polymorphia_backend.repository.course.event_section;

import com.agh.polymorphia_backend.model.event_section.EventSection;
import com.agh.polymorphia_backend.model.hall_of_fame.StudentScoreDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventSectionRepository extends JpaRepository<EventSection, Long> {
    List<EventSection> findByIdIn(List<Long> ids);
}
