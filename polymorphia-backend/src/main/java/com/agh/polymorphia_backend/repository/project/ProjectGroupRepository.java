package com.agh.polymorphia_backend.repository.project;

import com.agh.polymorphia_backend.model.project.ProjectGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProjectGroupRepository extends JpaRepository<ProjectGroup, Long> {
    @Query("""
             SELECT pg FROM ProjectGroup pg
                 JOIN pg.animals a
                 WHERE a.studentCourseGroupAssignment.student.userId = :studentId AND pg.project.id = :projectId
            """)
    Optional<ProjectGroup> getProjectGroupByStudentIdAndProjectId(@Param("studentId") Long studentId,
                                                                  @Param("projectId") Long projectId);

    @Query("""
             SELECT pg FROM ProjectGroup pg
                 WHERE pg.id = :id AND pg.project.id = :projectId
            """)
    Optional<ProjectGroup> getProjectGroupByIdAndProjectId(@Param("id") Long id, @Param("projectId") Long projectId);

    @Query("""
             SELECT pg FROM ProjectGroup pg
                 JOIN pg.animals a
                 WHERE a.studentCourseGroupAssignment.student.userId = :studentId
                    AND pg.id = :id
                    AND pg.project.id = :projectId
            """)
    Optional<ProjectGroup> getProjectGroupByIdAndStudentIdAndProjectId(@Param("id") Long id,
                                                                       @Param("studentId") Long studentId,
                                                                       @Param("projectId") Long projectId);

    @Query("""
             SELECT pg FROM ProjectGroup pg
                 JOIN pg.animals a
                 WHERE a.studentCourseGroupAssignment.student.userId = :studentId
                    AND pg.project.id = :projectId
                    AND pg.teachingRoleUser.userId = :teachingRoleUserId
            """)
    Optional<ProjectGroup> getProjectGroupByStudentIdAndProjectIdAndTeachingRoleUserId(
            @Param("studentId") Long studentId, @Param("projectId") Long projectId,
            @Param("teachingRoleUserId") Long teachingRoleUserId);

    @Query("""
             SELECT pg FROM ProjectGroup pg
                 WHERE pg.id = :id AND pg.project.id = :projectId AND pg.teachingRoleUser.userId = :teachingRoleUserId
            """)
    Optional<ProjectGroup> getProjectGroupByIdAndProjectIdAndTeachingRoleUserId(@Param("id") Long id,
                                                                                @Param("projectId") Long projectId,
                                                                                @Param("teachingRoleUserId")
                                                                                Long teachingRoleUserId);
}
