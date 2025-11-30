package com.agh.polymorphia_backend.repository.project;

import com.agh.polymorphia_backend.dto.response.project.ProjectGroupPickStudentsResponseDto;
import com.agh.polymorphia_backend.model.project.Project;
import com.agh.polymorphia_backend.model.project.ProjectVariantCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    @Query("""                                                                                                                                                                                                                                                                                                                                                                                                                      
      select distinct c
      from ProjectVariantCategory c
      left join fetch c.variants v
      where c.project.id = :projectId
      order by c.id, v.id
  """)
    List<ProjectVariantCategory> findCategoriesWithVariants(Long projectId);

    @Query("select p.allowCrossCourseGroupProjectGroups from Project p where p.id = :projectId")
    boolean findAllowCrossCourseGroupProjectGroups(Long projectId);


    @Query("""
            select hofe.studentId      as id,
                   hofe.studentName    as fullName,
                   hofe.animalName     as animalName,
                   hofe.evolutionStage as evolutionStage,
                   hofe.groupName      as group,
                   hofe.imageUrl       as imageUrl,
                   hofe.position       as position
            from HallOfFameEntry hofe
                     join StudentCourseGroupAssignment scga on scga.animal.id = hofe.animalId
            where (scga.courseGroup.teachingRoleUser.userId = :teachingRoleUserId or
                   scga.courseGroup.course.coordinator.userId = :teachingRoleUserId)
              and (:includeAllGroups = true or hofe.groupName in :groups)
              and hofe.courseId = :courseId
              and not exists (
                         select 1
                         from ProjectGroup pg
                              join pg.animals a
                              join pg.project p
                         where a.id = hofe.animalId
                           and p.id = :gradableEventId
                   )
            order by hofe.studentName
            """)
    List<ProjectGroupPickStudentsResponseDto> getProjectGroupConfigurationGroupPickStudents(
            @Param("courseId") Long courseId,
            @Param("gradableEventId") Long gradableEventId,
            @Param("teachingRoleUserId") Long teachingRoleUserId,
            @Param("groups") List<String> groups,
            @Param("includeAllGroups") Boolean includeAllGroups
    );
}
