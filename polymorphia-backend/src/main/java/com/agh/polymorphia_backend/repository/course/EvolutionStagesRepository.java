package com.agh.polymorphia_backend.repository.course;

import com.agh.polymorphia_backend.model.course.EvolutionStage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EvolutionStagesRepository extends JpaRepository<EvolutionStage, Long> {
    List<EvolutionStage> findAllByCourseId(Long courseId);
}
