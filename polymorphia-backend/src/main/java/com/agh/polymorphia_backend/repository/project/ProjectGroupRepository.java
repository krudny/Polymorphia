package com.agh.polymorphia_backend.repository.project;

import com.agh.polymorphia_backend.model.project.ProjectGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
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

    @Query("""
               select pg.id as projectGroupId, hofe.studentId as studentId, hofe.studentName as fullName, hofe.animalName as animalName, hofe.evolutionStage as evolutionStage, hofe.groupName as group, hofe.imageUrl as imageUrl, cg.grade.id as gradeId, sum(cg.xp) as gainedXp
               from ProjectGroup pg
               join pg.animals a
               join HallOfFameEntry hofe on a.id = hofe.animalId
               join pg.project.criteria c
               left join CriterionGrade cg on c.id = cg.criterion.id and cg.grade.gradableEvent.id = :projectId and cg.grade.animal.id = a.id
               where pg.project.id = :projectId
               and (pg.teachingRoleUser.userId = :teachingRoleUserId or pg.project.eventSection.course.coordinator.userId = :teachingRoleUserId and :showAllProjectGroupsInCourse = true)
               group by pg.id, hofe.studentId, hofe.studentName, hofe.animalName, hofe.evolutionStage, hofe.groupName, hofe.imageUrl, cg.grade.id
            """)
    List<ProjectTargetDataView> getProjectTargetsData(Long projectId, Long teachingRoleUserId, Boolean showAllProjectGroupsInCourse);
}
