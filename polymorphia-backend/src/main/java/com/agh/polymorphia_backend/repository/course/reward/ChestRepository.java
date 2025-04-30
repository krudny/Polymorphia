package com.agh.polymorphia_backend.repository.course.reward;

import com.agh.polymorphia_backend.model.course.reward.Chest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChestRepository extends JpaRepository<Chest, Long> {
    List<Chest> findAllByCourseId(Long courseId);
}
