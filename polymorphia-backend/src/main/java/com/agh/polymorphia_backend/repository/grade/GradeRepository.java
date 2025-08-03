package com.agh.polymorphia_backend.repository.grade;

import com.agh.polymorphia_backend.model.grade.Grade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;

public interface GradeRepository extends JpaRepository<Grade, Long> {
    Optional<Grade> findByGradableEventIdAndAnimalId(Long gradableEventId, Long animalId);

    Optional<Set<Grade>> findByAnimalId(Long animalId);

}
