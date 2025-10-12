package com.agh.polymorphia_backend.repository.course;

import com.agh.polymorphia_backend.model.course.StudentCourseGroupAssignment;
import com.agh.polymorphia_backend.model.course.StudentCourseGroupAssignmentId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentCourseGroupRepository extends JpaRepository<StudentCourseGroupAssignment, StudentCourseGroupAssignmentId> {
    Integer countByCourseGroupId(Long courseGroupId);
}
