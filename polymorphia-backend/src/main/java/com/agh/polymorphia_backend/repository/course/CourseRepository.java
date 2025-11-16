package com.agh.polymorphia_backend.repository.course;

import com.agh.polymorphia_backend.model.course.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
}