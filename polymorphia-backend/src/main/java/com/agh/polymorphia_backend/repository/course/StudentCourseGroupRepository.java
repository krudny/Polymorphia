package com.agh.polymorphia_backend.repository.course;

import com.agh.polymorphia_backend.model.course.StudentCourseGroupAssignment;
import com.agh.polymorphia_backend.model.course.StudentCourseGroupAssignmentId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentCourseGroupRepository extends JpaRepository<StudentCourseGroupAssignment, StudentCourseGroupAssignmentId> {
    @Query("SELECT s FROM StudentCourseGroupAssignment s " +
            "JOIN s.courseGroup cg " +
            "WHERE s.id.studentId = :studentId AND cg.course.id = :courseId")
    Optional<StudentCourseGroupAssignment> findByIdStudentIdAndCourseId(
            @Param("studentId") Long studentId,
            @Param("courseId") Long courseId
    );

    @Query(value = """
            SElECT s.student.userId FROM StudentCourseGroupAssignment s
            WHERE s.animal.id = :animalId
            """)
    Long getStudentIdByAnimalId(Long animalId);

    @Modifying
    @Query(value = """
    UPDATE students_course_groups
    SET course_group_id = :newCourseGroupId
    WHERE course_group_id = :oldCourseGroupId
      AND animal_id = :animalId
    """, nativeQuery = true)
    void updateStudentCourseGroupId(
            @Param("animalId") Long animalId,
            @Param("oldCourseGroupId") Long oldCourseGroupId,
            @Param("newCourseGroupId") Long newCourseGroupId
    );
}
