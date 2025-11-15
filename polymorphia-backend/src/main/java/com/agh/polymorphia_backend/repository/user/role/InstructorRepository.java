package com.agh.polymorphia_backend.repository.user.role;

import com.agh.polymorphia_backend.model.user.Instructor;
import com.agh.polymorphia_backend.repository.user.UserDetailsRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InstructorRepository extends JpaRepository<Instructor, Long>, UserDetailsRepository {
    @Query(
            "select i from CourseGroup cg " +
                    "join  cg.teachingRoleUser i " +
                    "where i.user.id=:userId and cg.course.id=:courseId"
    )
    @Override
    Optional<Instructor> findByUserIdAndCourseId(Long userId, Long courseId);

    Optional<Instructor> findByUserId(Long userId);

    @Query("""
            select (count(i) > 0) from StudentCourseGroupAssignment scg
            join scg.courseGroup cg
            join cg.teachingRoleUser i
            where scg.student.user.id=:studentId
            and cg.course.id=:courseId
            and i.user.id=:instructorId
            """)
    boolean hasAccessToStudentInCourse(Long instructorId, Long courseId, Long studentId);
}