package com.agh.polymorphia_backend.repository.event;

import com.agh.polymorphia_backend.model.event.gradable.GradableEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GradableEventRepository extends JpaRepository<GradableEvent, Long> {
}
