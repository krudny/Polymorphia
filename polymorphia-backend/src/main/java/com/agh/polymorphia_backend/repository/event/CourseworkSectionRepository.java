package com.agh.polymorphia_backend.repository.event;

import com.agh.polymorphia_backend.model.event.section.CourseworkSection;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseworkSectionRepository extends JpaRepository<CourseworkSection, Integer> {
}