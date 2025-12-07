package com.agh.polymorphia_backend.repository.project;

import com.agh.polymorphia_backend.model.project.ProjectVariant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectVariantRepository extends JpaRepository<ProjectVariant, Long> {
}
