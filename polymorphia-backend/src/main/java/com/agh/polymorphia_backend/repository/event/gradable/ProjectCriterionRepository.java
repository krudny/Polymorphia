package com.agh.polymorphia_backend.repository.event.gradable;

import com.agh.polymorphia_backend.model.event.gradable.GradableEvent;
import com.agh.polymorphia_backend.model.event.gradable.ProjectCriterion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectCriterionRepository extends JpaRepository<ProjectCriterion, Long> {
    Page<GradableEvent<?>> findAllByProjectSection_Id(Long projectSectionId, Pageable pageable);
}
