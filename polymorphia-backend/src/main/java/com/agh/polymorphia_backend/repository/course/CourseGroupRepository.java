package com.agh.polymorphia_backend.repository.course;

import com.agh.polymorphia_backend.model.course.CourseGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CourseGroupRepository extends JpaRepository<CourseGroup, Long> {
    List<CourseGroup> findByCourseId(Long courseId);

    @Query(
            "select cg from CourseGroup cg " +
                    "join cg.studentCourseGroupAssignments scga " +
                    "where scga.student.user.id = :userId " +
                    "and scga.animal is not null " +
                    "and cg.course.id = :courseId"
    )
    List<CourseGroup> findByStudentIdAndCourseIdWhereAnimalExists(Long userId, Long courseId);

    @Query(
            "select cg from CourseGroup cg " +
                    "where cg.instructor.user.id = :userId " +
                    "and cg.course.id = :courseId"
    )
    List<CourseGroup> findByInstructorIdAndCourseId(Long userId, Long courseId);
}
