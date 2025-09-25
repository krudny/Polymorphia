package com.agh.polymorphia_backend.repository.course;

import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GradableEventRepository extends JpaRepository<GradableEvent, Long> {

}
