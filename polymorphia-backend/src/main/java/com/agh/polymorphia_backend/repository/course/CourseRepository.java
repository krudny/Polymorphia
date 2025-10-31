package com.agh.polymorphia_backend.repository.course;

import com.agh.polymorphia_backend.model.course.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

    @Query("SELECT DISTINCT c FROM Course c " +
            "JOIN c.courseGroups cg " +
            "JOIN cg.studentCourseGroupAssignments scga " +
            "WHERE scga.student.user.id = :userId")
    List<Course> findCoursesByStudentUserId(@Param("userId") Long userId);

    @Query("SELECT DISTINCT c FROM Course c " +
            "JOIN c.courseGroups cg " +
            "WHERE cg.instructor.user.id = :userId")
    List<Course> findCoursesByInstructorUserId(@Param("userId") Long userId);

    @Query("SELECT DISTINCT c FROM Course c " +
            "WHERE c.coordinator.user.id = :userId")
    List<Course> findCoursesByCoordinatorUserId(@Param("userId") Long userId);
}