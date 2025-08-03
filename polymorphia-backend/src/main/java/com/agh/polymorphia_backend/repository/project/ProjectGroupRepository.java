package com.agh.polymorphia_backend.repository.project;

import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.model.project.ProjectGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ProjectGroupRepository extends JpaRepository<ProjectGroup, Long> {
    @Query("""
                SELECT pg FROM ProjectGroup pg
                JOIN pg.animals a
                JOIN pg.projectVariants pv
                JOIN pv.projectVariantCategory pvc
                WHERE a = :animal AND pvc.projectSection.id = :projectSectionId
            """)
    Optional<ProjectGroup> findByAnimalIdAndProjectSectionId(
            Animal animal,
            Long projectSectionId
    );
}
