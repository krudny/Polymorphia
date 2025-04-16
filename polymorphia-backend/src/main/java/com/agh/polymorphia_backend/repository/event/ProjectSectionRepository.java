package com.agh.polymorphia_backend.repository.event;

import com.agh.polymorphia_backend.model.event.ProjectSection;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectSectionRepository extends JpaRepository<ProjectSection, Integer> {
}
