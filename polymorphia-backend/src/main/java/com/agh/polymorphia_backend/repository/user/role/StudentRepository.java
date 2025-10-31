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
            "where s.user.id=:userId and scga.courseGroup.course.id=:courseId"
    )
    Optional<Student> findByUserIdAndCourseIdAndAssignedToCourseGroup(
        Long userId,
        Long courseId
    );

    @Query(
        "select s from Student s " +
            "join UserCourseRole ucr on ucr.user.id = s.user.id " +
            "where s.user.id = :userId and ucr.course.id = :courseId"
    )
    @Override
    Optional<Student> findByUserIdAndCourseId(Long userId, Long courseId);

    Optional<Student> findByIndexNumber(Integer indexNumber);

    Optional<Student> findByUserId(Long userId);

    @Query(
        """
            SELECT s FROM Student s
                JOIN StudentCourseGroupAssignment scga on scga.student.userId = s.userId
                JOIN CourseGroup cg on scga.courseGroup.id = cg.id
                JOIN Course c on cg.course.id = c.id
                JOIN EventSection es on c.id = es.course.id
                JOIN GradableEvent ge on es.id = ge.eventSection.id
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
            SELECT s FROM ProjectGroup pg
                JOIN pg.animals a
                JOIN a.studentCourseGroupAssignment scga
                JOIN scga.student s
                WHERE s.userId = :userId AND pg.project.id = :projectId AND pg.instructor.userId = :instructorId
        """
    )
    Optional<Student> findByUserIdAndProjectIdAndProjectGroupInstructorId(
        @Param("userId") Long userId,
        @Param("projectId") Long projectId,
        @Param("instructorId") Long instructorId
    );

    @Query(
        """
            SELECT s FROM ProjectGroup pg
                JOIN pg.animals a
                JOIN a.studentCourseGroupAssignment scga
                JOIN scga.student s
                WHERE pg.project.id = :projectId AND pg.id = :projectGroupId AND pg.instructor.userId = :instructorId
        """
    )
    List<Student> findByProjectIdAndProjectGroupIdAndInstructorId(
        @Param("projectId") Long projectId,
        @Param("projectGroupId") Long projectGroupId,
        @Param("instructorId") Long instructorId
    );

    @Query(
        """
            SELECT s FROM Student s
                JOIN StudentCourseGroupAssignment scga on scga.student.userId = s.userId
                JOIN CourseGroup cg on scga.courseGroup.id = cg.id
                JOIN Course c on cg.course.id = c.id
                JOIN EventSection es on c.id = es.course.id
                JOIN GradableEvent ge on es.id = ge.eventSection.id
                WHERE s.userId = :userId AND ge.id = :gradableEventId
        """
    )
    Optional<Student> findByUserIdAndGradableEventId(
        @Param("userId") Long userId,
        @Param("gradableEventId") Long gradableEventId
    );

    @Query(
        """
            SELECT s FROM ProjectGroup pg
                JOIN pg.animals a
                JOIN a.studentCourseGroupAssignment scga
                JOIN scga.student s
                WHERE s.userId = :userId AND pg.project.id = :projectId
        """
    )
    Optional<Student> findByUserIdAndProjectId(
        @Param("userId") Long userId,
        @Param("projectId") Long projectId
    );

    @Query(
        """
            SELECT s FROM ProjectGroup pg
                JOIN pg.animals a
                JOIN a.studentCourseGroupAssignment scga
                JOIN scga.student s
                WHERE pg.project.id = :projectId AND pg.id = :projectGroupId
        """
    )
    List<Student> findByProjectIdAndProjectGroupId(
        @Param("projectId") Long projectId,
        @Param("projectGroupId") Long projectGroupId
    );
}
