package com.agh.polymorphia_backend.repository.course;

import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.course.CourseGroup;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CourseGroupRepository extends JpaRepository<CourseGroup, Long> {
    List<CourseGroup> findByCourseId(Long courseId);

    @Query("""
                select cg.name from CourseGroup cg
                    where cg.course.id = :courseId
            """)
    List<String> findNamesByCourseId(Long courseId);

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

    @Query("""
        select cg from CourseGroup cg
            where (cg.teachingRoleUser.user.id = :teachingRoleUserId
            or cg.course.coordinator.userId = :teachingRoleUserId)
            and cg.id = :courseGroupId
    """)
    Optional<CourseGroup> findCourseGroupForTeachingRoleUser(Long courseGroupId, Long teachingRoleUserId);

    Long course(@NotNull Course course);
}
