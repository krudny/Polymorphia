package com.agh.polymorphia_backend.repository.course;

import com.agh.polymorphia_backend.model.user.student.EvolutionStage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EvolutionStagesRepository extends JpaRepository<EvolutionStage, Long> {
    List<EvolutionStage> findAllByCourseId(Long courseId);
}
