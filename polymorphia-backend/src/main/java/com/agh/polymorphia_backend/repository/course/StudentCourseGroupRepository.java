package com.agh.polymorphia_backend.repository.course;

import com.agh.polymorphia_backend.model.course.StudentCourseGroupAssignment;
import com.agh.polymorphia_backend.model.course.StudentCourseGroupAssignmentId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

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
}
