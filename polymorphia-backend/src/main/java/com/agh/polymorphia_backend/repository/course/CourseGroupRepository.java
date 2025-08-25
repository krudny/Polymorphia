package com.agh.polymorphia_backend.repository.course;

import com.agh.polymorphia_backend.model.course.CourseGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CourseGroupRepository extends JpaRepository<CourseGroup, Long> {
    Optional<CourseGroup> findByCourseIdAndInstructorId(Long courseId, Long instructorId);
}
