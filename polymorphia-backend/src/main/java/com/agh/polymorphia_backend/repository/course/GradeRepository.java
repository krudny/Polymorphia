package com.agh.polymorphia_backend.repository.course;

import com.agh.polymorphia_backend.model.grade.Grade;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GradeRepository extends JpaRepository<Grade, Long> {
}
