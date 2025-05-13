package com.agh.polymorphia_backend.repository.course;

import com.agh.polymorphia_backend.model.course.Animal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimalRepository extends JpaRepository<Animal, Long> {
}
