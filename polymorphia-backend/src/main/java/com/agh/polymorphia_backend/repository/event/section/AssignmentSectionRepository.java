package com.agh.polymorphia_backend.repository.event.section;

import com.agh.polymorphia_backend.model.event.section.AssignmentSection;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssignmentSectionRepository extends JpaRepository<AssignmentSection, Integer> {
}