package com.agh.polymorphia_backend.repository.event.gradable;

import com.agh.polymorphia_backend.model.event.gradable.GradableEvent;
import com.agh.polymorphia_backend.model.event.gradable.Test;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestRepository extends JpaRepository<Test, Long> {
    Page<GradableEvent<?>> findAllByTestSection_Id(Long testSectionId, Pageable pageable);
}
