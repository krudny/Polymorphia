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
                    "and cg.course.id = :courseId"
    )
    List<CourseGroup> findByStudentIdAndCourseIdAndIsAssignedToCourseGroup(Long userId, Long courseId);

    @Query(
            "select cg from CourseGroup cg " +
                    "where cg.teachingRoleUser.user.id = :userId " +
                    "and cg.course.id = :courseId"
    )
    List<CourseGroup> findByTeachingRoleUserIdAndCourseId(Long userId, Long courseId);
}
