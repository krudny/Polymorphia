package com.agh.polymorphia_backend.repository.user.role;

import com.agh.polymorphia_backend.model.user.Instructor;
import com.agh.polymorphia_backend.model.user.Student;
import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.repository.user.UserDetailsRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository
    extends JpaRepository<Student, Long>, UserDetailsRepository {
    @Query(
        "select s from StudentCourseGroupAssignment scga " +
            "join  scga.student s " +
            "where s.userId=:userId and scga.courseGroup.course.id=:courseId"
    )
    Optional<Student> findByUserIdAndCourseIdAndAssignedToCourseGroup(
        Long userId,
        Long courseId
    );

    @Query(
        "select s from Student s " +
            "join UserCourseRole ucr on ucr.user.id = s.userId " +
            "where s.userId = :userId and ucr.course.id = :courseId"
    )
    @Override
    Optional<Student> findByUserIdAndCourseId(Long userId, Long courseId);

    Optional<Student> findByIndexNumber(Integer indexNumber);

    Optional<Student> findByUserId(Long userId);

    @Query(
        """
            SELECT s FROM GradableEvent ge
                JOIN ge.eventSection es
                JOIN es.course c
                JOIN c.courseGroups cg
                JOIN cg.studentCourseGroupAssignments scga
                JOIN scga.student s
                WHERE s.userId = :userId AND ge.id = :gradableEventId AND cg.instructor.userId = :instructorId
        """
    )
    Optional<Student> findByUserIdAndGradableEventIdAndCourseGroupInstructorId(
        @Param("userId") Long userId,
        @Param("gradableEventId") Long gradableEventId,
        @Param("instructorId") Long instructorId
    );

    @Query(
        """
            SELECT s FROM GradableEvent ge
                JOIN ge.eventSection es
                JOIN es.course c
                JOIN c.courseGroups cg
                JOIN cg.studentCourseGroupAssignments scga
                JOIN scga.student s
                WHERE s.userId = :userId AND ge.id = :gradableEventId
        """
    )
    Optional<Student> findByUserIdAndGradableEventId(
        @Param("userId") Long userId,
        @Param("gradableEventId") Long gradableEventId
    );
}
