package com.agh.polymorphia_backend.repository.event;

import com.agh.polymorphia_backend.model.event.gradable.GradableEvent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface GradableEventRepository extends JpaRepository<GradableEvent, Long> {

    @Query("select g from GradableEvent g where g.eventSection.id=:eventSectionId order by g.orderIndex ASC")
    Page<GradableEvent> findAllByEventSectionIdPageable(Long eventSectionId, Pageable pageable);


    @Query("select g from GradableEvent g where g.eventSection.id=:eventSectionId order by g.orderIndex ASC")
    Set<GradableEvent> findAllByEventSectionId(Long eventSectionId);


}
