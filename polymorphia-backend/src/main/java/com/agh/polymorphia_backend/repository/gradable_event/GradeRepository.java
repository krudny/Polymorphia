package com.agh.polymorphia_backend.repository.gradable_event;

import com.agh.polymorphia_backend.model.gradable_event.Grade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GradeRepository extends JpaRepository<Grade, Long> {

    List<Grade> findAllByAnimalId(Long animalId);
}
