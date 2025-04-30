package com.agh.polymorphia_backend.repository.event;

import com.agh.polymorphia_backend.model.event.EventSection;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventSectionRepository extends JpaRepository<EventSection, Long> {
}
