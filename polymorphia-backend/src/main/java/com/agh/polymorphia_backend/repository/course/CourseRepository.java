package com.agh.polymorphia_backend.repository.course;

import com.agh.polymorphia_backend.model.course.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByCoordinatorId(Long coordinatorId);

    @Query(
            "select c from Course c " +
                    "join c.courseGroups cg " +
                    "where cg.instructor.id=:instructorId"
    )
    List<Course> findByInstructorId(Long instructorId);

    @Query(
            "select distinct c from Course c " +
                    "join c.courseGroups cg " +
                    "join cg.animals a " +
                    "where a.student.id = :studentId"
    )
    List<Course> findByStudentId(Long studentId);

}
