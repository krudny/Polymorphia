package com.agh.polymorphia_backend.repository.event.gradable;

import com.agh.polymorphia_backend.model.event.gradable.Assignment;
import com.agh.polymorphia_backend.model.event.gradable.GradableEvent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    Page<GradableEvent<?>> findAllByAssignmentSection_Id(Long assignmentSectionId, Pageable pageable);
}
